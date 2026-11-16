/**
 * build-catalog.mjs
 * Turns raw GitHub data (data/gh-mine.json + data/curated-raw.jsonl) into:
 *   src/data/catalog.json       - skill entries
 *   src/data/search-index.json  - prebuilt inverted index for ultra-fast search
 *   src/data/meta.json          - generatedAt / counts / categories
 *
 * Everything is static. Runtime never touches GitHub; it only tokenizes the query.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokenize, FIELD_WEIGHTS } from '../src/lib/tokenize.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const OUT = path.join(ROOT, 'src', 'data');
fs.mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ */
/* Category taxonomy (business domains)                                */
/* ------------------------------------------------------------------ */
export const CATEGORIES = [
  { id: 'ai-agent', label: 'AI / Agent', icon: '🤖', color: '#8b7cff' },
  { id: 'game', label: '游戏开发', icon: '🎮', color: '#ff7a9c' },
  { id: 'design', label: '设计 / UX', icon: '🎨', color: '#ffb454' },
  { id: 'devtools', label: '开发工具', icon: '🛠️', color: '#4dd4ac' },
  { id: 'content', label: '内容创作', icon: '✍️', color: '#f278c8' },
  { id: 'efficiency', label: '效率工具', icon: '⚡', color: '#ffd166' },
  { id: 'security', label: '安全', icon: '🔒', color: '#ff6b6b' },
  { id: 'data', label: '数据 / 数据库', icon: '🗄️', color: '#54b9ff' },
  { id: 'devops', label: '运维 / 网络', icon: '🌐', color: '#5ad1e6' },
  { id: 'desktop', label: '客户端 / 桌面', icon: '🖥️', color: '#a0a4ff' },
  { id: 'language', label: '语言 / 框架', icon: '🧩', color: '#9be15d' },
  { id: 'learn', label: '学习 / 资料', icon: '📚', color: '#c3a6ff' },
  { id: 'other', label: '其他', icon: '📦', color: '#9aa0aa' },
];

const CAT_RULES = [
  ['security', [/security|red.?team|vuln|cve|pentest|攻防|安全|渗透|firewall|linuxsafe|banhack|claude-red|reinstall233|safe233/i]],
  ['game', [/game|unity|unreal|godot|spine|roblox|phaser|threejs|gamedev|游戏|数值|策划|asset|urp|shader|live2d|pixel|graphify233|anim233|割草|minigame|tapTap/i]],
  ['design', [/design|ui|ux|figma|design-md|apple|动画|动效|anim|visual|样式|主题|icon|字体|shader|美术|taste/i]],
  ['ai-agent', [/agent|skill|claude|codex|copilot|mcp|llm|ai-|ai_|rag|prompt|大模型|智能体|deepseek|openclaw|hermes|superpower|llm-apps|dsh|agentwiki|context|memory/i]],
  ['content', [/video|novel|script|write|写作|小说|剧本|文学|漫画|wechat|微信| md2|markdown|translate|翻译|paper|论文|content|blog|podcast|tts|voice|audio|music|spoken|台词/i]],
  ['data', [/database|db|sql|redis|mongo|localdb|nekodb|cache|data|数据|excel|config|csv|vector|graphrag|search|searchcloud|index/i]],
  ['devops', [/devops|deploy|server|ssh|jump|ops|vpn|proxy|network|net|metrics|monitor|docker|k8s|linux|ci|cd|jenkins|gitea|git|cloud|forward|frp|scheduler|sentinel|uniops|bastion/i]],
  ['desktop', [/desktop|wails|electron|tauri|window|gui|client|app|wpf|winform|android|ios|mobile|phone|apk|toolbox|hub|launcher/i]],
  ['language', [/-lib-|^lib|bytemsg|qcp-|config233|sdk|rust|golang|go233|typescript|language|parser|compiler|framework|ioc233|rpc233|orm/i]],
  ['devtools', [/cli|tool|toolkit|helper|generator|builder|debug|editor|plugin|vscode|jetbrains|ide|dev|kit|util|convert|formatter|lint|build|codegraph|archanim|rcode|catsh|git-next/i]],
  ['efficiency', [/note|note|task|kanban|scheduler|clipboard|password|shortcut|quick|效率|自动化|automation|workflow|scratch|translate|cc-switch|switch/i]],
  ['learn', [/awesome|learn|tutorial|guide|book|guide|handbook|how-to|cookbook|reference|学习|指南|教程|资料|wiki|paper|study|novel233/i]],
];

const STOP_TAGS = new Set([
  'awesome', 'awesome-list', 'skill', 'skills', 'agent-skills', 'ai-agent', 'ai-agents',
  'ai', 'agent', 'claude', 'claude-code', 'codex', 'cursor', 'gemini', 'gemini-cli',
  'hacktoberfest', 'open-source', 'tool', 'tools', 'javascript', 'typescript', 'python', 'go',
]);

function classify(text) {
  for (const [id, rules] of CAT_RULES) {
    if (rules.some((r) => r.test(text))) return id;
  }
  return 'other';
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function pickTags(topics = [], extra = []) {
  const out = [];
  for (const t of [...topics, ...extra]) {
    const k = String(t).toLowerCase();
    if (k && !STOP_TAGS.has(k) && k.length <= 24 && !out.includes(k)) out.push(k);
  }
  return out.slice(0, 6);
}

/* Curated Chinese one-liners + business domain overrides for well-known repos */
const CURATED_OVERRIDES = {
  'anthropics/skills': { zh: 'Anthropic 官方 Agent Skills 仓库，规范与示例的权威来源。', cat: 'ai-agent', tags: ['官方', '规范', '示例'] },
  'mattpocock/skills': { zh: 'Total TypeScript 作者的生产级工程师技能集，来自真实 .agents 目录。', cat: 'ai-agent', tags: ['工程实践', 'TypeScript'] },
  'obra/superpowers': { zh: '成熟的 Agent 技能框架与软件开发方法论，含头脑风暴与子代理驱动开发。', cat: 'ai-agent', tags: ['框架', '方法论'] },
  'addyosmani/agent-skills': { zh: 'Addy Osmani 出品的生产级 AI 编码 Agent 技能集。', cat: 'ai-agent', tags: ['工程实践'] },
  'ComposioHQ/awesome-claude-skills': { zh: 'Claude Skills 精选清单：资源、工具与工作流定制。', cat: 'ai-agent', tags: ['精选清单', '工作流'] },
  'VoltAgent/awesome-agent-skills': { zh: '1000+ Agent Skills 精选集，兼容 Claude Code / Codex / Gemini CLI / Cursor。', cat: 'ai-agent', tags: ['精选清单', '多平台'] },
  'github/awesome-copilot': { zh: 'GitHub 官方社区贡献的 instructions / agents / skills / 配置集合。', cat: 'ai-agent', tags: ['官方', 'Copilot'] },
  'gamedev-skills/awesome-gamedev-agent-skills': { zh: '79 个游戏开发 Agent Skills，覆盖 Godot / Unity / Unreal / Roblox 等主流引擎。', cat: 'game', tags: ['游戏开发', '多引擎', '精选清单'] },
  'bergside/awesome-design-skills': { zh: '67 个 DESIGN.md / SKILL.md 设计技能文件，面向 Claude / Codex / Cursor。', cat: 'design', tags: ['设计系统', '精选清单'] },
  'SnailSploit/Claude-Red': { zh: '面向 Claude Skills 体系的红队攻击技能库，覆盖 SQLi 到 EDR 绕过。', cat: 'security', tags: ['红队', '渗透测试'] },
  'nextlevelbuilder/ui-ux-pro-max-skill': { zh: '跨平台的专业 UI/UX 设计智能技能，覆盖 Web 与移动端。', cat: 'design', tags: ['UI/UX', '前端'] },
  'Graphify-Labs/graphify': { zh: '将代码库、文档、SQL、配置与 PDF 转成可查询知识图谱（本地 AST，无向量库）。', cat: 'data', tags: ['知识图谱', '代码分析', 'RAG'] },
  'OpenMontageInc/OpenMontage': { zh: '开源 Agent 化视频生产系统：12 条制作流水线、100+ 工具、700+ 技能文件。', cat: 'content', tags: ['视频生成', '流水线'] },
  'sickn33/agentic-awesome-skills': { zh: '2955+ 可复用 Agent Skills，带本地目录发现、CLI、MCP 与插件。', cat: 'ai-agent', tags: ['技能库', 'CLI', 'MCP'] },
  'libukai/awesome-agent-skills': { zh: 'Agent Skills 终极指南：快速入门、资源推荐、精选技能与实用工具（中文）。', cat: 'learn', tags: ['中文', '入门指南'] },
  'microsoft/skills': { zh: '微软官方 Skills / MCP Servers / Custom Agents 与 SDK 的 Agents.md 指南。', cat: 'ai-agent', tags: ['官方', '微软', 'SDK'] },
  'hesreallyhim/awesome-claude-code': { zh: 'Claude Code 精品资源精选：技能、Agent、statusline、工具与插件。', cat: 'ai-agent', tags: ['精选清单', 'Claude Code'] },
  'Shubhamsaboo/awesome-llm-apps': { zh: '100+ AI Agent、Agent Skills 与 RAG 应用，免费开源。', cat: 'ai-agent', tags: ['应用合集', 'RAG'] },
  'tt-a1i/archify': { zh: '把想法、计划或代码库变成精美交互架构图，支持 DSH / Claude Code / Codex。', cat: 'devtools', tags: ['架构图', '可视化', 'DSH'] },
  'Leonxlnx/taste-skill': { zh: '让编码 Agent 拥有审美：艺术指导、参考图与浏览器自检，告别千篇一律页面。', cat: 'design', tags: ['审美', '前端', 'UI'] },
  'affaan-m/ECC': { zh: 'Agent harness 性能优化系统：技能、直觉、记忆、安全与研究优先开发。', cat: 'ai-agent', tags: ['性能优化', '记忆', '安全'] },
  'multica-ai/andrej-karpathy-skills': { zh: '源自 Karpathy 对 LLM 编码陷阱观察的单文件 CLAUDE.md 改进方案。', cat: 'ai-agent', tags: ['CLAUDE.md', '最佳实践'] },
  'microsoft/SkillOpt': { zh: '微软 SkillOpt：通过轨迹驱动编辑训练可复用自然语言技能。', cat: 'ai-agent', tags: ['官方', '技能优化', '研究'] },
  'ciembor/agent-rules-books': { zh: '基于《Clean Code》《重构》《DDD》等经典的 AGENTS.md 规则与技能集。', cat: 'ai-agent', tags: ['代码质量', 'DDD', '规则'] },
  'geekjourneyx/md2wechat-skill': { zh: '面向 Agent 的微信公众号创作与发布 CLI：Markdown 排版、AI 配图、草稿创建。', cat: 'content', tags: ['微信公众号', 'CLI', '中文'] },
  '0xNyk/awesome-hermes-agent': { zh: 'Hermes Agent 的独立技能、插件、记忆与工具目录。', cat: 'learn', tags: ['精选清单', 'Hermes'] },
};

/* ----------------------------- load sources ----------------------------- */
const mine = JSON.parse(fs.readFileSync(path.join(DATA, 'gh-mine.json'), 'utf8'));
const curatedLines = fs.readFileSync(path.join(DATA, 'curated-raw.jsonl'), 'utf8').trim().split('\n');
const curated = [];
{
  const seen = new Set();
  for (const line of curatedLines) {
    try {
      const o = JSON.parse(line);
      if (!o.full_name || seen.has(o.full_name)) continue;
      seen.add(o.full_name);
      curated.push(o);
    } catch { /* skip malformed line */ }
  }
}

const entries = [];
const pushEntry = (e) => {
  if (!e || !e.fullName) return;
  if (entries.some((x) => x.fullName.toLowerCase() === e.fullName.toLowerCase())) return;
  entries.push(e);
};

/* -------------------------- own repos (mine) ---------------------------- */
for (const r of mine) {
  if (!r.nameWithOwner) continue;
  if (r.isArchived) continue;
  const [owner, name] = r.nameWithOwner.split('/');
  const desc = (r.description || '').trim();
  const topics = (r.repositoryTopics || []).map((t) => (typeof t === 'string' ? t : t.name || t.topic?.name)).filter(Boolean);
  const lang = r.primaryLanguage?.name || r.primaryLanguage || '';
  const hay = `${name} ${desc} ${topics.join(' ')} ${lang}`;
  const cat = classify(hay);
  // "好用的": keep repos that are tools/skills/libraries; skip obvious noise
  const noise = /privacy.?policy|terms|config-only|readme-only/i.test(name);
  if (noise) continue;
  const isSkill = /^skill|^dsh-plugin|^agent|^mcp233|-cli$|^tool233|^ihub-plugin/i.test(name) || /skill|agent/i.test(desc);
  pushEntry({
    id: slug(`${owner}-${name}`),
    name,
    owner,
    fullName: r.nameWithOwner,
    url: r.url || `https://github.com/${r.nameWithOwner}`,
    homepage: r.homepageUrl || '',
    description: desc,
    descriptionZh: '',
    stars: r.stargazerCount || 0,
    forks: r.forkCount || 0,
    language: lang,
    topics,
    tags: pickTags(topics, [lang]),
    category: cat,
    source: 'mine',
    isSkill,
    featured: isSkill || (r.stargazerCount || 0) >= 3,
    install: `git clone https://github.com/${r.nameWithOwner}.git`,
    updatedAt: r.updatedAt || '',
  });
}

/* ---------------------- curated external skills ------------------------- */
for (const o of curated) {
  const [owner, name] = o.full_name.split('/');
  const ov = CURATED_OVERRIDES[o.full_name] || {};
  const desc = (o.description || '').trim();
  const topics = o.topics || [];
  const cat = ov.cat || classify(`${name} ${desc} ${topics.join(' ')}`);
  pushEntry({
    id: slug(`${owner}-${name}`),
    name,
    owner,
    fullName: o.full_name,
    url: o.html_url || `https://github.com/${o.full_name}`,
    homepage: '',
    description: desc,
    descriptionZh: ov.zh || '',
    stars: o.stargazers_count || 0,
    forks: 0,
    language: o.language || '',
    topics,
    tags: pickTags(topics, ov.tags || []),
    category: cat,
    source: 'curated',
    isSkill: true,
    featured: true,
    install: `npx skills add ${o.full_name}`,
    updatedAt: o.updated_at || '',
  });
}

/* --------------------------- build index -------------------------------- */
/** @type {Record<string, number[]>} flat [id, weight, id, weight, ...] */
const postings = Object.create(null);
entries.forEach((e, id) => {
  const fields = [
    [e.name, FIELD_WEIGHTS.name],
    [e.fullName, FIELD_WEIGHTS.fullName],
    [e.tags.join(' '), FIELD_WEIGHTS.tags],
    [e.descriptionZh, FIELD_WEIGHTS.description],
    [e.description, FIELD_WEIGHTS.description],
    [CATEGORIES.find((c) => c.id === e.category)?.label || '', FIELD_WEIGHTS.category],
    [e.topics.join(' '), FIELD_WEIGHTS.topics],
    [e.owner, FIELD_WEIGHTS.owner],
  ];
  const seen = new Set();
  for (const [text, weight] of fields) {
    for (const tok of tokenize(text)) {
      const key = `${tok}\u0000${id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      (postings[tok] ||= []).push(id, weight);
    }
  }
});
const tokens = Object.keys(postings).sort();

/* ------------------------------ write ----------------------------------- */
const generatedAt = new Date().toISOString();
const catCounts = {};
for (const e of entries) catCounts[e.category] = (catCounts[e.category] || 0) + 1;

fs.writeFileSync(path.join(OUT, 'catalog.json'), JSON.stringify(entries));
fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify({ postings, tokens }));
fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify({
  generatedAt,
  total: entries.length,
  mine: entries.filter((e) => e.source === 'mine').length,
  curated: entries.filter((e) => e.source === 'curated').length,
  categories: CATEGORIES,
  counts: catCounts,
}, null, 2));

console.log(`catalog: ${entries.length} entries (${catCounts})`);
console.log(`index:   ${tokens.length} unique tokens`);
console.log(`written to ${OUT}`);
