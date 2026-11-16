/**
 * fetch-data.mjs — refresh raw GitHub data via `gh`.
 * Requires: gh auth login (read:repo scope is enough for public data).
 * Run: npm run data:fetch
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
fs.mkdirSync(DATA, { recursive: true });
const OWNER = process.env.GH_OWNER || 'neko233-com';

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

// 1) all public repos of the owner
const reposJson = gh([
  'repo', 'list', OWNER, '--visibility', 'public', '--limit', '500',
  '--json', 'nameWithOwner,description,url,homepageUrl,primaryLanguage,stargazerCount,forkCount,repositoryTopics,updatedAt,createdAt,isArchived,isFork,licenseInfo',
]);
fs.writeFileSync(path.join(DATA, 'gh-mine.json'), reposJson.trim());
console.log(`fetched ${JSON.parse(reposJson).length} public repos from ${OWNER}`);

// 2) curated external skills / tools across every business domain.
// Every entry is verified via the GitHub API (real stars, topics, updated_at).
const CURATED = [
  // ---- AI / Agent / Skills -------------------------------------------------
  'anthropics/skills', 'mattpocock/skills', 'obra/superpowers', 'addyosmani/agent-skills',
  'ComposioHQ/awesome-claude-skills', 'VoltAgent/awesome-agent-skills', 'github/awesome-copilot',
  'sickn33/agentic-awesome-skills', 'libukai/awesome-agent-skills', 'microsoft/skills',
  'hesreallyhim/awesome-claude-code', 'Shubhamsaboo/awesome-llm-apps',
  'affaan-m/ECC', 'multica-ai/andrej-karpathy-skills', 'microsoft/SkillOpt',
  'ciembor/agent-rules-books', '0xNyk/awesome-hermes-agent', 'helloianneo/awesome-claude-code-skills',
  // ---- Prompt / Context Engineering ---------------------------------------
  'ai-boost/awesome-prompts', 'promptslab/Awesome-Prompt-Engineering',
  'Meirtz/Awesome-Context-Engineering', 'snwfdhmp/awesome-gpt-prompt-engineering',
  'EgoAlpha/prompt-in-context-learning',
  // ---- RAG / Knowledge ----------------------------------------------------
  'HKUDS/LightRAG', 'microsoft/graphrag', 'infiniflow/ragflow',
  'NirDiamant/RAG_Techniques', 'SciPhi-AI/R2R', 'weaviate/Verba', 'Graphify-Labs/graphify',
  // ---- Frontend / Design --------------------------------------------------
  'zarazhangrui/frontend-slides', 'wilwaldon/Claude-Code-Frontend-Design-Toolkit',
  'glitternetwork/pinme', 'nateherkai/scroll-craft', 'superdesigndev/superdesign-skill',
  'VoltAgent/awesome-design-md', 'plugin87/ux-ui-agent-skills',
  'feimacode/open-design-agent-kit', 'redongreen/uSpec',
  'bergside/awesome-design-skills', 'nextlevelbuilder/ui-ux-pro-max-skill',
  'Leonxlnx/taste-skill', 'tt-a1i/archify',
  // ---- Game ---------------------------------------------------------------
  'gamedev-skills/awesome-gamedev-agent-skills', 'Donchitos/Claude-Code-Game-Studios',
  'SerpentAI/SerpentAI', 'datamllab/awesome-game-ai', 'Yuan-ManX/ai-game-devtools',
  'aseprite/aseprite', 'lospec/pixel-editor', 'OpenMontageInc/OpenMontage',
  // ---- Legal --------------------------------------------------------------
  'open-legal-products/mike', 'CSHaitao/Awesome-LegalAI-Resources',
  'lilialla/awesome-legal-ai-zh', 'Vaquill-AI/awesome-legaltech',
  'rohasnagpal/legal-ai-skills', 'sunyifeisb-art/legalwork', 'Ginowine/redline',
  // ---- Finance ------------------------------------------------------------
  'TauricResearch/TradingAgents', 'fasiondog/hikyuu', 'georgezouq/awesome-ai-in-finance',
  'FudanDISC/DISC-FinLLM', 'akfamily/akquant',
  // ---- Medical / Health ---------------------------------------------------
  'sunlabuiuc/PyHealth', 'maziyarpanahi/openmed', 'TorchIO-project/torchio',
  'sammargolis/OpenScribe',
  // ---- Education ----------------------------------------------------------
  'JushBJJ/Mr.-Ranedeer-AI-Tutor', 'HugeCatLab/ChatTutor', 'plastic-labs/tutor-gpt',
  'Li-Evan/BloomTutor',
  // ---- Research / Science -------------------------------------------------
  'yenanjing/awesome-ai-for-science', 'StaryMoon/ai-researcher-skills',
  'SPYfighting/dsh-science-plugin',
  // ---- Marketing / SEO / E-commerce --------------------------------------
  'ericosiu/ai-marketing-skills', 'ALwrity/ALwrity', 'zubair-trabzada/ai-marketing-claude',
  'nexscope-ai/eCommerce-Skills', 'seranking/seo-skills', 'YILS-LIN/short-video-factory',
  // ---- Video / Music / Audio ----------------------------------------------
  'brycedrennan/imaginAIry', 'duixcom/Duix-Avatar', 'Forget-C/Jellyfish',
  'multimodal-art-projection/YuE', 'salu133445/musegan', 'riffusion/riffusion-hobby',
  'gcui-art/suno-api', 'myshell-ai/MeloTTS', 'NVIDIA-NeMo/Speech',
  // ---- Writing / Content --------------------------------------------------
  'ExplosiveCoderflome/AI-Novel-Writing-Assistant', 'PenglongHuang/chinese-novelist-skill',
  'hanlulong/econ-writing-skill', 'alfredxw/denova', 'syrizelink/OpenFic',
  'geekjourneyx/md2wechat-skill',
  // ---- Translation --------------------------------------------------------
  'argosopentech/argos-translate', 'libretranslate/LibreTranslate',
  // ---- Security -----------------------------------------------------------
  'SnailSploit/Claude-Red', '0x4m4/hexstrike-ai', 'GH05TCREW/pentestagent',
  'Armur-Ai/Pentest-Swarm-AI', '0xSteph/pentest-ai-agents',
  'scadastrangelove/awesome-ai-security-tools', 'wgpsec/AboutSecurity',
  // ---- DevOps / SRE -------------------------------------------------------
  'chaterm/Chaterm', 'kubeshark/kubeshark', 'BagelHole/DevOps-Security-Agent-Skills',
  'Arvo-AI/aurora',
  // ---- Data / Database ----------------------------------------------------
  'vanna-ai/vanna', 'apache/doris', 'oceanbase/seekdb', 'databendlabs/databend',
  'Canner/vulcan-sql',
  // ---- HR / Sales / Real estate ------------------------------------------
  'vorojar/ai-native-hiring-guide', 'melgarafael/DeskcommCRM',
  'kaymen99/sales-outreach-automation-langgraph', 'relaticle/relaticle',
  'iPythoning/b2b-sdr-agent-template', 'brightdata/real-estate-ai-agent',
  'zubair-trabzada/ai-realestate-claude', 'ahacker-1/cre-agent-skills',
  // ---- Productivity / Learning -------------------------------------------
  'YSGStudyHards/Awesome-Tools', 'engineering-management/awesome-engineering-management',
  'devtoolsd/awesome-devtools',
];
const lines = [];
let failed = 0;
for (const r of CURATED) {
  try {
    const raw = gh(['api', `repos/${r}`, '--jq', '{full_name,description,stargazers_count,html_url,language,topics,updated_at,default_branch,owner:(.owner.login)}']);
    lines.push(raw.trim());
  } catch (e) {
    failed++;
    console.warn(`skip ${r}: ${String(e.message).slice(0, 80)}`);
  }
}
fs.writeFileSync(path.join(DATA, 'curated-raw.jsonl'), lines.join('\n') + '\n');
console.log(`fetched ${lines.length} curated repos (${failed} skipped)`);
