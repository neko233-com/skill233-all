/**
 * build-catalog.mjs
 * Turns raw GitHub data (data/gh-mine.json + data/curated-raw.jsonl) into:
 *   src/data/catalog.json       - skill entries (with group/domain/subGroup)
 *   src/data/search-index.json  - prebuilt inverted index for ultra-fast search
 *   src/data/meta.json          - generatedAt / counts / group→domain→subGroup tree
 *
 * Everything is static. Runtime never touches GitHub; it only tokenizes the query.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokenize, FIELD_WEIGHTS } from '../src/lib/tokenize.js';
import {
  GROUPS, DOMAINS, classifyDomain, classifySubGroup,
} from '../src/lib/taxonomy.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const OUT = path.join(ROOT, 'src', 'data');
fs.mkdirSync(OUT, { recursive: true });

const domainById = new Map(DOMAINS.map((d) => [d.id, d]));
const groupById = new Map(GROUPS.map((g) => [g.id, g]));

const STOP_TAGS = new Set([
  'awesome', 'awesome-list', 'skill', 'skills', 'agent-skills', 'ai-agent', 'ai-agents',
  'ai', 'agent', 'claude', 'claude-code', 'codex', 'cursor', 'gemini', 'gemini-cli',
  'hacktoberfest', 'open-source', 'tool', 'tools', 'javascript', 'typescript', 'python', 'go',
]);

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

/* Curated Chinese one-liners + domain overrides for well-known repos. */
const CURATED_OVERRIDES = {
  // AI / Agent
  'anthropics/skills': { zh: 'Anthropic 官方 Agent Skills 仓库，规范与示例的权威来源。', cat: 'ai-agent', tags: ['官方', '规范', '示例'] },
  'mattpocock/skills': { zh: 'Total TypeScript 作者的生产级工程师技能集，来自真实 .agents 目录。', cat: 'ai-agent', tags: ['工程实践', 'TypeScript'] },
  'obra/superpowers': { zh: '成熟的 Agent 技能框架与软件开发方法论，含头脑风暴与子代理驱动开发。', cat: 'ai-agent', tags: ['框架', '方法论'] },
  'addyosmani/agent-skills': { zh: 'Addy Osmani 出品的生产级 AI 编码 Agent 技能集。', cat: 'ai-agent', tags: ['工程实践'] },
  'ComposioHQ/awesome-claude-skills': { zh: 'Claude Skills 精选清单：资源、工具与工作流定制。', cat: 'ai-agent', tags: ['精选清单', '工作流'] },
  'VoltAgent/awesome-agent-skills': { zh: '1000+ Agent Skills 精选集，兼容 Claude Code / Codex / Gemini CLI / Cursor。', cat: 'ai-agent', tags: ['精选清单', '多平台'] },
  'github/awesome-copilot': { zh: 'GitHub 官方社区贡献的 instructions / agents / skills / 配置集合。', cat: 'ai-agent', tags: ['官方', 'Copilot'] },
  'sickn33/agentic-awesome-skills': { zh: '2955+ 可复用 Agent Skills，带本地目录发现、CLI、MCP 与插件。', cat: 'ai-agent', tags: ['技能库', 'CLI', 'MCP'] },
  'microsoft/skills': { zh: '微软官方 Skills / MCP Servers / Custom Agents 与 SDK 的 Agents.md 指南。', cat: 'ai-agent', tags: ['官方', '微软', 'SDK'] },
  'hesreallyhim/awesome-claude-code': { zh: 'Claude Code 精品资源精选：技能、Agent、statusline、工具与插件。', cat: 'ai-agent', tags: ['精选清单', 'Claude Code'] },
  'affaan-m/ECC': { zh: 'Agent harness 性能优化系统：技能、直觉、记忆、安全与研究优先开发。', cat: 'ai-agent', tags: ['性能优化', '记忆'] },
  'multica-ai/andrej-karpathy-skills': { zh: '源自 Karpathy 对 LLM 编码陷阱观察的单文件 CLAUDE.md 改进方案。', cat: 'ai-agent', tags: ['CLAUDE.md', '最佳实践'] },
  'microsoft/SkillOpt': { zh: '微软 SkillOpt：通过轨迹驱动编辑训练可复用自然语言技能。', cat: 'ai-agent', tags: ['官方', '研究'] },
  'ciembor/agent-rules-books': { zh: '基于《Clean Code》《重构》《DDD》等经典的 AGENTS.md 规则与技能集。', cat: 'ai-agent', tags: ['代码质量', 'DDD'] },
  'Shubhamsaboo/awesome-llm-apps': { zh: '100+ AI Agent、Agent Skills 与 RAG 应用，免费开源。', cat: 'llm-app', tags: ['应用合集', 'RAG'] },
  'libukai/awesome-agent-skills': { zh: 'Agent Skills 终极指南：快速入门、资源推荐、精选技能与实用工具（中文）。', cat: 'learn', tags: ['中文', '入门指南'] },
  '0xNyk/awesome-hermes-agent': { zh: 'Hermes Agent 的独立技能、插件、记忆与工具目录。', cat: 'learn', tags: ['精选清单', 'Hermes'] },
  'helloianneo/awesome-claude-code-skills': { zh: 'Claude Code 最实用 Skills / Agents / Plugins 精选合集，50+ 按场景分类、带推荐等级、复制即装。', cat: 'ai-agent', tags: ['中文', '精选清单'] },
  // Prompt / RAG
  'ai-boost/awesome-prompts': { zh: '面向 LLM 与 Agent 的精选提示词、框架与论文，含工程化实践。', cat: 'prompt', tags: ['提示词库', '工程化'] },
  'promptslab/Awesome-Prompt-Engineering': { zh: '精心整理的 Prompt Engineering 资源、工具与学习路线。', cat: 'prompt', tags: ['精选清单', '教程'] },
  'Meirtz/Awesome-Context-Engineering': { zh: '从 Prompt 到生产级上下文工程的全面综述与资源。', cat: 'prompt', tags: ['上下文工程', '综述'] },
  'snwfdhmp/awesome-gpt-prompt-engineering': { zh: 'GPT / LLM 提示工程资源、工具与技巧精选。', cat: 'prompt', tags: ['精选清单'] },
  'HKUDS/LightRAG': { zh: '港大出品：简单快速的检索增强生成（RAG）框架，EMNLP 2025。', cat: 'rag', tags: ['RAG', 'EMNLP'] },
  'microsoft/graphrag': { zh: '微软 GraphRAG：基于知识图谱的模块化检索增强生成系统。', cat: 'rag', tags: ['官方', '知识图谱'] },
  'infiniflow/ragflow': { zh: 'RAGFlow：Agent 原生的检索增强生成引擎与知识库平台。', cat: 'rag', tags: ['RAG 引擎', '知识库'] },
  'NirDiamant/RAG_Techniques': { zh: '高级 RAG 技术大全：从基础到前沿的实战 Notebook 教程。', cat: 'rag', tags: ['技术教程', 'Notebook'] },
  'SciPhi-AI/R2R': { zh: '生产级 Agentic RAG 检索系统，支持多源 ingested 与重排序。', cat: 'rag', tags: ['生产级', 'RAG'] },
  'weaviate/Verba': { zh: '基于 Weaviate 的 RAG 聊天机器人，快速搭建私有知识库问答。', cat: 'rag', tags: ['知识库', '问答'] },
  'Graphify-Labs/graphify': { zh: '把代码库、文档、SQL、配置与 PDF 转成可查询知识图谱（本地 AST，无向量库）。', cat: 'rag', tags: ['知识图谱', '代码分析'] },
  // Frontend / Design
  'zarazhangrui/frontend-slides': { zh: '用编码 Agent 的前端技能创建精美网页幻灯片。', cat: 'frontend', tags: ['幻灯片', '前端技能'] },
  'wilwaldon/Claude-Code-Frontend-Design-Toolkit': { zh: '让 Claude Code 前端输出更好看的设计工具与资源合集。', cat: 'frontend', tags: ['设计工具', '前端'] },
  'glitternetwork/pinme': { zh: '一条命令部署前端，支持 Claude Code Skills。', cat: 'frontend', tags: ['部署', 'CLI'] },
  'nateherkai/scroll-craft': { zh: '构建高级沉浸式滚动驱动网站的 Agent Skill。', cat: 'frontend', tags: ['动效', 'Agent Skill'] },
  'superdesigndev/superdesign-skill': { zh: '面向 Claude Code / Cursor 的设计技能，告别千篇一律的 AI 页面。', cat: 'design', tags: ['设计技能', 'UI'] },
  'VoltAgent/awesome-design-md': { zh: ' popular 品牌设计系统 DESIGN.md 文件合集，直接喂给编码 Agent。', cat: 'design', tags: ['设计系统', 'DESIGN.md'] },
  'plugin87/ux-ui-agent-skills': { zh: '把 Claude 变成资深设计架构师：DTCG tokens、52 组件、WCAG 2.2。', cat: 'design', tags: ['UX/UI', '设计系统'] },
  'feimacode/open-design-agent-kit': { zh: '在编码 Agent 或聊天中生成海报、社媒图、幻灯片与落地页。', cat: 'design', tags: ['视觉设计', '设计工具'] },
  'redongreen/uSpec': { zh: '从 UI 组件直接生成设计系统文档。', cat: 'design', tags: ['设计系统', '文档'] },
  'bergside/awesome-design-skills': { zh: '67 个 DESIGN.md / SKILL.md 设计技能文件，面向 Claude / Codex / Cursor。', cat: 'design', tags: ['设计系统', '精选清单'] },
  'nextlevelbuilder/ui-ux-pro-max-skill': { zh: '跨平台的专业 UI/UX 设计智能技能，覆盖 Web 与移动端。', cat: 'design', tags: ['UI/UX', '前端'] },
  'Leonxlnx/taste-skill': { zh: '让编码 Agent 拥有审美：艺术指导、参考图与浏览器自检。', cat: 'design', tags: ['审美', 'UI'] },
  'tt-a1i/archify': { zh: '把想法、计划或代码库变成精美交互架构图，支持 DSH / Claude Code / Codex。', cat: 'devtools', tags: ['架构图', '可视化'] },
  // Game
  'gamedev-skills/awesome-gamedev-agent-skills': { zh: '79 个游戏开发 Agent Skills，覆盖 Godot / Unity / Unreal / Roblox 等主流引擎。', cat: 'game-dev', tags: ['游戏开发', '多引擎'] },
  'Donchitos/Claude-Code-Game-Studios': { zh: '把 Claude Code 变成完整游戏工作室：49 个 AI 角色 + 72 个工作流技能。', cat: 'game-dev', tags: ['游戏工作室', '多智能体'] },
  'SerpentAI/SerpentAI': { zh: '游戏 Agent 框架：帮助创建能学习玩任意游戏的 AI / Bot。', cat: 'game-dev', tags: ['游戏 AI', 'Bot'] },
  'datamllab/awesome-game-ai': { zh: '游戏 AI 精选资源：多智能体强化学习方向。', cat: 'game-dev', tags: ['游戏 AI', '强化学习'] },
  'Yuan-ManX/ai-game-devtools': { zh: 'AI 游戏开发资源中心，聚合 AI 驱动的游戏开发工具与技能。', cat: 'game-dev', tags: ['资源中心', '开发工具'] },
  'aseprite/aseprite': { zh: 'Aseprite：跨平台动画精灵与像素画编辑器，独立游戏美术标配。', cat: 'game-art', tags: ['像素画', '精灵动画'] },
  'lospec/pixel-editor': { zh: 'Lospec 在线像素画编辑器，浏览器即可创作像素美术。', cat: 'game-art', tags: ['像素画', '在线工具'] },
  'OpenMontageInc/OpenMontage': { zh: '开源 Agent 化视频生产系统：12 条制作流水线、100+ 工具、700+ 技能文件。', cat: 'video', tags: ['视频生成', '流水线'] },
  // Legal
  'open-legal-products/mike': { zh: '开源法律 AI 平台：合同、法条与法律文书的智能处理。', cat: 'legal', tags: ['法律 AI', '平台'] },
  'CSHaitao/Awesome-LegalAI-Resources': { zh: '法律 AI 资源大全：数据、模型、工具与论文一站式汇总。', cat: 'legal', tags: ['法律 AI', '资源汇总'] },
  'lilialla/awesome-legal-ai-zh': { zh: '给中国律师/法务的一站式开源 AI 工具地图：200+ 经 GitHub 核验仓库，按场景分类并标注能否商用。', cat: 'legal', tags: ['中文', '律师', '工具地图'] },
  'Vaquill-AI/awesome-legaltech': { zh: 'LegalTech 精选清单：开源平台、AI 模型与法律科技资源。', cat: 'legal', tags: ['LegalTech', '精选清单'] },
  'rohasnagpal/legal-ai-skills': { zh: '90 秒搭建 AI 驱动的全方位律所：法律 Agent Skills 集合。', cat: 'legal', tags: ['法律技能', '律所'] },
  'sunyifeisb-art/legalwork': { zh: 'LegalWork：面向法律工作的 AI 工作台。', cat: 'legal', tags: ['法律工作台'] },
  'Ginowine/redline': { zh: 'Redline：面向人类与 Agent 的合同审查工作区，支持红线标注。', cat: 'legal', tags: ['合同审查', '红线'] },
  // Finance
  'TauricResearch/TradingAgents': { zh: 'TradingAgents：多智能体 LLM 金融交易框架，模拟真实交易团队分工。', cat: 'finance', tags: ['多智能体', '量化交易'] },
  'fasiondog/hikyuu': { zh: 'Hikyuu：C++/Python 高性能量化交易框架，回测与实盘一体。', cat: 'finance', tags: ['量化框架', '回测'] },
  'georgezouq/awesome-ai-in-finance': { zh: '金融领域 AI / LLM / 深度学习策略与工具精选清单。', cat: 'finance', tags: ['AI 金融', '精选清单'] },
  'FudanDISC/DISC-FinLLM': { zh: '复旦 DISC-FinLLM：中文金融大语言模型，面向金融咨询场景。', cat: 'finance', tags: ['中文', '金融大模型'] },
  'akfamily/akquant': { zh: 'AKQuant：高性能量化研究与交易框架，Python 实现。', cat: 'finance', tags: ['量化研究', 'Python'] },
  // Medical
  'sunlabuiuc/PyHealth': { zh: 'PyHealth：医疗 AI 深度学习工具包，覆盖 EHR、临床文本与医疗影像。', cat: 'medical', tags: ['医疗 AI', 'EHR'] },
  'maziyarpanahi/openmed': { zh: 'OpenMed：本地优先的医疗 AI，临床 NER 与 HIPAA PII 脱敏。', cat: 'medical', tags: ['本地优先', '临床 NER'] },
  'TorchIO-project/torchio': { zh: 'TorchIO：面向 AI 的医学影像处理与增强库。', cat: 'medical', tags: ['医学影像', 'PyTorch'] },
  'sammargolis/OpenScribe': { zh: 'OpenScribe：开源 AI 医疗记录员，自动记录问诊并生成病历。', cat: 'medical', tags: ['AI 病历', '问诊'] },
  // Education
  'JushBJJ/Mr.-Ranedeer-AI-Tutor': { zh: 'Mr. Ranedeer AI Tutor：可定制的个性化学习 GPT 提示词。', cat: 'education', tags: ['AI 导师', '提示词'] },
  'HugeCatLab/ChatTutor': { zh: 'ChatTutor：可视化交互式 AI 导师，支持白板与实时讲解。', cat: 'education', tags: ['AI 导师', '交互白板'] },
  'plastic-labs/tutor-gpt': { zh: 'Tutor GPT：基于心智理论推理的 AI 辅导系统。', cat: 'education', tags: ['AI 辅导', '推理'] },
  'Li-Evan/BloomTutor': { zh: 'BloomTutor：开源个性化 AI 导师，苏格拉底式自适应课程。', cat: 'education', tags: ['AI 导师', '自适应'] },
  // Research
  'yenanjing/awesome-ai-for-science': { zh: 'AI for Science 精选项目：用 AI 自动化科研全流程。', cat: 'research', tags: ['AI4Science', '精选清单'] },
  'StaryMoon/ai-researcher-skills': { zh: 'AI 研究 Agent 实用技能包：论文速览、实验规划、Rebuttal 写作。', cat: 'research', tags: ['科研技能', '论文'] },
  'SPYfighting/dsh-science-plugin': { zh: 'DSH 科研团队工作台：9 角色研究 Agent 与论文蓝图工作流。', cat: 'research', tags: ['DSH', '多智能体'] },
  // Marketing
  'ericosiu/ai-marketing-skills': { zh: '开源 AI 营销技能集：增长实验、销售管线与内容运营。', cat: 'marketing', tags: ['营销技能', '增长'] },
  'ALwrity/ALwrity': { zh: 'ALwrity：AI 驱动的数字营销平台，内容策略与规划一体化。', cat: 'marketing', tags: ['数字营销', '内容策略'] },
  'zubair-trabzada/ai-marketing-claude': { zh: '面向 Claude Code 的 AI 营销套件：15 个营销技能与并行子代理。', cat: 'marketing', tags: ['营销技能', 'Claude Code'] },
  'nexscope-ai/eCommerce-Skills': { zh: '电商 Agent Skills：选品调研、营销自动化与供应链。', cat: 'marketing', tags: ['电商', '技能集'] },
  'seranking/seo-skills': { zh: 'SE Ranking 官方 Claude SEO Skills，面向 MCP 的生产级技能。', cat: 'marketing', tags: ['SEO', '官方'] },
  'YILS-LIN/short-video-factory': { zh: '一键生成产品营销与泛内容短视频，AI 批量自动剪辑的跨平台桌面工具。', cat: 'video', tags: ['短视频', '营销'] },
  // Video / Music / Audio
  'brycedrennan/imaginAIry': { zh: 'imaginAIry：Python 风格 AI 图像与视频生成工具。', cat: 'video', tags: ['视频生成', 'Python'] },
  'duixcom/Duix-Avatar': { zh: 'Duix-Avatar：真正开源的数字人离线视频生成工具包。', cat: 'video', tags: ['数字人', '离线'] },
  'Forget-C/Jellyfish': { zh: 'Jellyfish：AI 短剧端到端生产工作台，从剧本到成片。', cat: 'video', tags: ['短剧', '生产流水线'] },
  'multimodal-art-projection/YuE': { zh: 'YuE2：前沿音乐生成模型，支持符号规划与零样本翻唱。', cat: 'music', tags: ['音乐生成', '零样本'] },
  'salu133445/musegan': { zh: 'MuseGAN：基于 GAN 的多轨音乐生成 AI。', cat: 'music', tags: ['音乐生成', 'GAN'] },
  'riffusion/riffusion-hobby': { zh: 'Riffusion：用 Stable Diffusion 实时生成音乐。', cat: 'music', tags: ['音乐生成', 'Diffusion'] },
  'gcui-art/suno-api': { zh: 'Suno API：在应用中集成 suno.ai 音乐生成能力。', cat: 'music', tags: ['Suno', 'API'] },
  'myshell-ai/MeloTTS': { zh: 'MeloTTS：高质量 multilingual 文本转语音库，支持中英日韩等。', cat: 'music', tags: ['TTS', '多语言'] },
  'NVIDIA-NeMo/Speech': { zh: 'NVIDIA NeMo Speech：面向研究与开发的可扩展生成式语音 AI 框架。', cat: 'music', tags: ['语音 AI', '官方'] },
  // Writing
  'ExplosiveCoderflome/AI-Novel-Writing-Assistant': { zh: '面向长篇小说的 AI Native 开源系统：Agent、世界观、写法引擎、RAG 与整本生产工作流。', cat: 'writing', tags: ['长篇小说', 'RAG'] },
  'PenglongHuang/chinese-novelist-skill': { zh: 'AI 写小说：从零生成 10–50 章完整中文小说，创作记忆、悬念钩子与自动校验。', cat: 'writing', tags: ['中文小说', 'Agent Skill'] },
  'hanlulong/econ-writing-skill': { zh: '把 AI 助手变成经济论文写作专家的 Agent Skill。', cat: 'writing', tags: ['论文写作', '经济'] },
  'alfredxw/denova': { zh: 'Denova：小说写作与角色扮演的一站式 AI 工作台。', cat: 'writing', tags: ['小说写作', '角色扮演'] },
  'syrizelink/OpenFic': { zh: 'OpenFic：跨平台、用户友好的 AI Native 小说创作工具。', cat: 'writing', tags: ['小说创作', '跨平台'] },
  'geekjourneyx/md2wechat-skill': { zh: '面向 Agent 的微信公众号创作与发布 CLI：Markdown 排版、AI 配图、草稿创建。', cat: 'content', tags: ['微信公众号', 'CLI'] },
  // Translation
  'argosopentech/argos-translate': { zh: 'Argos Translate：Python 编写的开源离线翻译库。', cat: 'translate', tags: ['离线翻译', 'Python'] },
  'libretranslate/LibreTranslate': { zh: 'LibreTranslate：自由开源的机器翻译 API，可自托管、离线运行。', cat: 'translate', tags: ['翻译 API', '自托管'] },
  // Security
  'SnailSploit/Claude-Red': { zh: '面向 Claude Skills 体系的红队攻击技能库，覆盖 SQLi 到 EDR 绕过。', cat: 'security', tags: ['红队', '渗透测试'] },
  '0x4m4/hexstrike-ai': { zh: 'HexStrike AI MCP Agents：让 AI Agent 调用的高级攻击安全 MCP 服务器。', cat: 'security', tags: ['MCP', '攻击安全'] },
  'GH05TCREW/pentestagent': { zh: 'PentestAgent：支持黑盒安全测试的 AI Agent 框架。', cat: 'security', tags: ['渗透测试', 'AI Agent'] },
  'Armur-Ai/Pentest-Swarm-AI': { zh: '自主渗透测试的 AI 集群：编排侦察、利用与报告全流程。', cat: 'security', tags: ['渗透测试', '多智能体'] },
  '0xSteph/pentest-ai-agents': { zh: '把 Claude Code 变成进攻性安全研究助手的专项 AI Agent。', cat: 'security', tags: ['红队', 'Claude Code'] },
  'scadastrangelove/awesome-ai-security-tools': { zh: 'AI 安全工具精选：公共、研究与商业工具全覆盖。', cat: 'security', tags: ['AI 安全', '精选清单'] },
  'wgpsec/AboutSecurity': { zh: '渗透测试知识库，以 AI Agent 可执行格式沉淀安全方法论。', cat: 'security', tags: ['渗透测试', '知识库'] },
  // DevOps
  'chaterm/Chaterm': { zh: '开源 AI 终端，用于云与基础设施管理，自然语言运维。', cat: 'devops', tags: ['AI 终端', '运维'] },
  'kubeshark/kubeshark': { zh: '基于 eBPF 的 Kubernetes 网络可观测性工具，索引 L4/L7 流量。', cat: 'devops', tags: ['K8s', '可观测'] },
  'BagelHole/DevOps-Security-Agent-Skills': { zh: 'Agent 就绪的 DevOps、安全、基础设施与合规知识库。', cat: 'devops', tags: ['DevOps', '合规'] },
  'Arvo-AI/aurora': { zh: 'Aurora：开源 AI 驱动的 Agent 化事件管理与根因分析系统。', cat: 'devops', tags: ['事件管理', '根因分析'] },
  // Data
  'vanna-ai/vanna': { zh: 'Vanna：用 LLM 实现精准 Text-to-SQL，与数据库对话。', cat: 'data', tags: ['Text-to-SQL', 'LLM'] },
  'apache/doris': { zh: 'Apache Doris：面向 AI Agent 的实时分析与混合搜索数据库。', cat: 'data', tags: ['数据库', '实时分析'] },
  'oceanbase/seekdb': { zh: 'OceanBase SeekDB：AI 原生搜索数据库，统一向量、全文与结构化检索。', cat: 'data', tags: ['AI 原生', '向量检索'] },
  'databendlabs/databend': { zh: 'Databend：Data Agent 就绪的云数仓，支持分析、搜索与 Python 沙箱。', cat: 'data', tags: ['云数仓', 'Data Agent'] },
  'Canner/vulcan-sql': { zh: 'Vulcan-SQL：面向 AI Agent 与数据应用的数据 API 框架。', cat: 'data', tags: ['数据 API', 'Agent'] },
  // Productivity
  'YSGStudyHards/Awesome-Tools': { zh: '程序员常用高效实用工具与软件资源精选，办公效率提升利器。', cat: 'efficiency', tags: ['效率工具', '精选清单'] },
  'engineering-management/awesome-engineering-management': { zh: '工程管理学习资源与日常实践工具精选。', cat: 'product', tags: ['工程管理', '精选清单'] },
  'devtoolsd/awesome-devtools': { zh: '开发者工具与服务精选：云平台、协作、效率全覆盖。', cat: 'devtools', tags: ['开发工具', '精选清单'] },
  // HR / Sales / Real estate
  'vorojar/ai-native-hiring-guide': { zh: 'AI-Native 工程师招聘面试手册：Builder / Reviewer 双岗评分与 AI 驾驶能力实操考核。', cat: 'hr', tags: ['招聘', '面试'] },
  'melgarafael/DeskcommCRM': { zh: '开源 AI 销售 OS：自托管 CRM，原生 AI Agent 与 WhatsApp 集成。', cat: 'sales', tags: ['CRM', 'AI 销售'] },
  'relaticle/relaticle': { zh: '开源 CRM，AI Agent 可直接读写公司、联系人与商机数据。', cat: 'sales', tags: ['CRM', '开源'] },
  'kaymen99/sales-outreach-automation-langgraph': { zh: '用 LangGraph AI Agent 自动化潜客调研、资质评估与外联。', cat: 'sales', tags: ['获客', 'LangGraph'] },
  'iPythoning/b2b-sdr-agent-template': { zh: '开源 B2B AI SDR 模板：10 阶段销售管线与定时自动化。', cat: 'sales', tags: ['SDR', '销售自动化'] },
  'brightdata/real-estate-ai-agent': { zh: '智能抓取房地产房源数据并结构化的 Python 系统。', cat: 'realestate', tags: ['房产数据', '采集'] },
  'zubair-trabzada/ai-realestate-claude': { zh: '面向 Claude Code 的 AI 房产研究引擎，多维度分析物业投资价值。', cat: 'realestate', tags: ['房产研究', 'Claude'] },
  'ahacker-1/cre-agent-skills': { zh: '商业地产 AI Agent Skills：承销、尽调与财务建模。', cat: 'realestate', tags: ['商业地产', 'Agent Skills'] },
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

function withTaxonomy(e, text) {
  const domainId = e.category && domainById.has(e.category) ? e.category : classifyDomain(text, e.fullName);
  const domain = domainById.get(domainId) || domainById.get('other');
  return {
    ...e,
    category: domain.id,
    group: domain.group,
    subGroup: classifySubGroup(domain.id, text, e.fullName),
  };
}

/* -------------------------- own repos (mine) ---------------------------- */
for (const r of mine) {
  if (!r.nameWithOwner) continue;
  if (r.isArchived) continue;
  const [owner, name] = r.nameWithOwner.split('/');
  const desc = (r.description || '').trim();
  const topics = (r.repositoryTopics || []).map((t) => (typeof t === 'string' ? t : t.name || t.topic?.name)).filter(Boolean);
  const lang = r.primaryLanguage?.name || r.primaryLanguage || '';
  const hay = `${name} ${desc} ${topics.join(' ')} ${lang}`;
  const noise = /privacy.?policy|terms|config-only|readme-only/i.test(name);
  if (noise) continue;
  const isSkill = /^skill|^dsh-plugin|^agent|^mcp233|-cli$|^tool233|^ihub-plugin/i.test(name) || /skill|agent/i.test(desc);
  pushEntry(withTaxonomy({
    id: slug(`${owner}-${name}`),
    name, owner, fullName: r.nameWithOwner,
    url: r.url || `https://github.com/${r.nameWithOwner}`,
    homepage: r.homepageUrl || '',
    description: desc, descriptionZh: '',
    stars: r.stargazerCount || 0, forks: r.forkCount || 0, language: lang,
    topics, tags: pickTags(topics, [lang]),
    source: 'mine', isSkill,
    featured: isSkill || (r.stargazerCount || 0) >= 3,
    install: `git clone https://github.com/${r.nameWithOwner}.git`,
    updatedAt: r.updatedAt || '',
  }, hay));
}

/* ---------------------- curated external skills ------------------------- */
for (const o of curated) {
  const [owner, name] = o.full_name.split('/');
  const ov = CURATED_OVERRIDES[o.full_name] || {};
  const desc = (o.description || '').trim();
  const topics = o.topics || [];
  const hay = `${name} ${desc} ${topics.join(' ')} ${ov.zh || ''} ${(ov.tags || []).join(' ')}`;
  pushEntry(withTaxonomy({
    id: slug(`${owner}-${name}`),
    name, owner, fullName: o.full_name,
    url: o.html_url || `https://github.com/${o.full_name}`,
    homepage: '',
    description: desc, descriptionZh: ov.zh || '',
    stars: o.stargazers_count || 0, forks: 0, language: o.language || '',
    topics, tags: pickTags(topics, ov.tags || []),
    category: ov.cat || '',
    source: 'curated', isSkill: true, featured: true,
    install: `npx skills add ${o.full_name}`,
    updatedAt: o.updated_at || '',
  }, hay));
}

/* --------------------------- build index -------------------------------- */
/** @type {Record<string, number[]>} flat [id, weight, id, weight, ...] */
const postings = Object.create(null);
entries.forEach((e, id) => {
  const domain = domainById.get(e.category);
  const sub = domain?.subs.find((s) => s.id === e.subGroup);
  const fields = [
    [e.name, FIELD_WEIGHTS.name],
    [e.fullName, FIELD_WEIGHTS.fullName],
    [e.tags.join(' '), FIELD_WEIGHTS.tags],
    [e.descriptionZh, FIELD_WEIGHTS.description],
    [e.description, FIELD_WEIGHTS.description],
    [domain?.label || '', FIELD_WEIGHTS.category],
    [sub?.label || '', FIELD_WEIGHTS.category * 0.6],
    [groupById.get(e.group)?.label || '', FIELD_WEIGHTS.category * 0.4],
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
const counts = {};
const subCounts = {};
const groupCounts = {};
for (const e of entries) {
  counts[e.category] = (counts[e.category] || 0) + 1;
  subCounts[`${e.category}/${e.subGroup}`] = (subCounts[`${e.category}/${e.subGroup}`] || 0) + 1;
  groupCounts[e.group] = (groupCounts[e.group] || 0) + 1;
}

// Attach counts to the domain tree for the sidebar.
const domainsWithCounts = DOMAINS.map((d) => ({
  ...d,
  count: counts[d.id] || 0,
  subs: d.subs.map((s) => ({ ...s, count: subCounts[`${d.id}/${s.id}`] || 0 })),
}));
const groupsWithCounts = GROUPS.map((g) => ({ ...g, count: groupCounts[g.id] || 0 }));

fs.writeFileSync(path.join(OUT, 'catalog.json'), JSON.stringify(entries));
fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify({ postings, tokens }));
fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify({
  generatedAt,
  total: entries.length,
  mine: entries.filter((e) => e.source === 'mine').length,
  curated: entries.filter((e) => e.source === 'curated').length,
  groups: groupsWithCounts,
  categories: domainsWithCounts,
  counts,
  subCounts,
  groupCounts,
}, null, 2));

console.log(`catalog: ${entries.length} entries`);
console.log(`groups:  ${groupsWithCounts.map((g) => `${g.label}:${g.count}`).join('  ')}`);
console.log(`index:   ${tokens.length} unique tokens`);
console.log(`written to ${OUT}`);
