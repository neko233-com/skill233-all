/**
 * taxonomy.mjs — the single source of truth for the skill directory hierarchy.
 *
 *   Group (分组)  →  Domain (领域)  →  SubGroup (子分组)  →  Skill
 *
 * Consumed by build-catalog.mjs at build time. The generated meta.json carries
 * the full tree to the frontend, so runtime never imports this file.
 */

/* Top-level groups: broad chapters shown as sections in the left vertical tab. */
export const GROUPS = [
  { id: 'ai',       label: 'AI 智能',   icon: '◈', desc: 'Agent · 大模型 · Prompt · RAG' },
  { id: 'tools',    label: '实用软件', icon: '🧰', desc: '网络 · 浏览器 · 办公 · 影音 · 系统 · AI 助手（小白友好）' },
  { id: 'dev',      label: '软件工程', icon: '⌘', desc: '前后端 · 工具 · 运维 · 数据 · 安全' },
  { id: 'game',     label: '游戏',      icon: '🎮', desc: '开发 · 策划 · 美术 · 运营' },
  { id: 'creative', label: '设计创意', icon: '✦', desc: '设计 · 内容 · 视频 · 写作 · 音乐' },
  { id: 'pro',      label: '专业领域', icon: '§', desc: '法律 · 金融 · 医疗 · 教育 · 研究 · 营销' },
  { id: 'life',     label: '效率生活', icon: '⚡', desc: '效率 · 学习 · 其他' },
];

const GENERAL = { id: 'general', label: '综合' };

/* Domains (领域). `group` links to GROUPS; `subs` are in-domain groupings. */
export const DOMAINS = [
  /* ---------------------------- AI 智能 -------------------------------- */
  {
    id: 'ai-agent', label: 'AI / Agent 技能', icon: '🤖', group: 'ai',
    subs: [
      { id: 'framework', label: '框架与方法论', kw: /framework|superpower|method|harness|sdk|rule|spec|awesome-claude|claude-code/i },
      { id: 'collection', label: '精选清单', kw: /awesome|collection|curated|精选|清单/i },
      { id: 'engineering', label: '工程实践', kw: /engineering|production|typescript|best.?practice|refactor|clean.?code/i },
      GENERAL,
    ],
  },
  {
    id: 'prompt', label: 'Prompt / 上下文工程', icon: '💬', group: 'ai',
    subs: [
      { id: 'prompt-lib', label: '提示词库', kw: /prompt|提示词|instruction/i },
      { id: 'context', label: '上下文工程', kw: /context|memory|记忆|rag/i },
      GENERAL,
    ],
  },
  {
    id: 'rag', label: 'RAG / 知识库', icon: '🗄️', group: 'ai',
    subs: [
      { id: 'engine', label: 'RAG 引擎', kw: /rag|retriev|graphrag|lightrag|ragflow|verba|r2r/i },
      { id: 'knowledge', label: '知识图谱', kw: /graph|knowledge|知识|graphify/i },
      { id: 'technique', label: '技术教程', kw: /technique|tutorial|guide|技术|教程/i },
      GENERAL,
    ],
  },
  {
    id: 'llm-app', label: '大模型应用', icon: '🧠', group: 'ai',
    subs: [
      { id: 'app', label: '应用合集', kw: /app|application|应用|llm-apps/i },
      { id: 'multimodal', label: '多模态', kw: /multimodal|image|vision|audio|多模态/i },
      GENERAL,
    ],
  },

  /* ---------------------------- 实用软件 ------------------------------- */
  /* Software tools for everyone (esp. non-programmers). Entries set their
     category/subGroup explicitly from tools-data.mjs; no keyword rules. */
  {
    id: 'tool-net', label: '网络代理', icon: '🌐', group: 'tools',
    subs: [
      { id: 'net-desktop', label: '电脑客户端' },
      { id: 'net-ios', label: 'iPhone / iPad' },
      { id: 'net-android', label: '安卓' },
      { id: 'net-core', label: '跨平台内核' },
    ],
  },
  {
    id: 'tool-browser', label: '浏览器', icon: '🧭', group: 'tools',
    subs: [
      { id: 'browser-main', label: '主流浏览器' },
      { id: 'browser-privacy', label: '隐私浏览器' },
      { id: 'browser-ext', label: '必装插件' },
    ],
  },
  {
    id: 'tool-office', label: '办公协作', icon: '📁', group: 'tools',
    subs: [
      { id: 'office-suite', label: '办公套件' },
      { id: 'office-collab', label: '团队协作' },
      { id: 'office-doc', label: '文档笔记' },
    ],
  },
  {
    id: 'tool-media', label: '影音播放', icon: '🎬', group: 'tools',
    subs: [
      { id: 'media-player', label: '视频播放器' },
      { id: 'media-music', label: '音乐平台' },
    ],
  },
  {
    id: 'tool-download', label: '下载传输', icon: '⬇️', group: 'tools',
    subs: [{ id: 'dl-manager', label: '下载工具' }],
  },
  {
    id: 'tool-file', label: '文件管理', icon: '🗂️', group: 'tools',
    subs: [
      { id: 'file-archive', label: '压缩解压' },
      { id: 'file-search', label: '搜索 / 空间分析' },
      { id: 'file-sync', label: '同步备份' },
    ],
  },
  {
    id: 'tool-system', label: '系统增强', icon: '🛠️', group: 'tools',
    subs: [
      { id: 'sys-tune', label: '系统优化' },
      { id: 'sys-clean', label: '清理安全' },
    ],
  },
  {
    id: 'tool-privacy', label: '密码与隐私', icon: '🔐', group: 'tools',
    subs: [
      { id: 'pass-mgr', label: '密码管理' },
      { id: 'pass-priv', label: '隐私工具' },
    ],
  },
  {
    id: 'tool-image', label: '图片工具', icon: '🖼️', group: 'tools',
    subs: [
      { id: 'img-capture', label: '截图录屏' },
      { id: 'img-edit', label: '图片编辑' },
    ],
  },
  {
    id: 'tool-ai', label: 'AI 助手', icon: '✨', group: 'tools',
    subs: [
      { id: 'ai-chat', label: 'AI 对话' },
      { id: 'ai-image', label: 'AI 绘画' },
      { id: 'ai-office', label: 'AI 办公' },
    ],
  },
  {
    id: 'tool-translate', label: '翻译词典', icon: '🌍', group: 'tools',
    subs: [{ id: 'tr-tool', label: '翻译工具' }],
  },
  {
    id: 'tool-chat', label: '通讯社交', icon: '💬', group: 'tools',
    subs: [{ id: 'chat-im', label: '即时通讯' }],
  },
  {
    id: 'tool-devstart', label: '编程入门', icon: '💻', group: 'tools',
    subs: [
      { id: 'dev-editor', label: '编辑器 / IDE' },
      { id: 'dev-env', label: '运行环境' },
      { id: 'dev-db', label: '数据库工具' },
    ],
  },

  /* ---------------------------- 软件工程 ------------------------------- */
  {
    id: 'frontend', label: '前端开发', icon: '🌐', group: 'dev',
    subs: [
      { id: 'ui-system', label: '组件 / 设计系统', kw: /component|ui|design.system|tailwind|shadcn|design-md|dtcg|wcag/i },
      { id: 'framework', label: '框架 / 构建', kw: /react|vue|vite|next|nuxt|slide|build|scroll|frontend/i },
      { id: 'coderskill', label: '编码技能', kw: /skill|claude|agent|copilot|coding/i },
      GENERAL,
    ],
  },
  {
    id: 'backend', label: '后端 / API', icon: '⚙️', group: 'dev',
    subs: [
      { id: 'api', label: 'API 设计', kw: /api|rest|graphql|grpc|sdk/i },
      { id: 'service', label: '服务框架', kw: /server|service|fastapi|django|express|go|rust|java/i },
      GENERAL,
    ],
  },
  {
    id: 'devtools', label: '开发工具', icon: '🛠️', group: 'dev',
    subs: [
      { id: 'cli', label: 'CLI / 终端', kw: /cli|terminal|shell|catsh|git-next|chaterm/i },
      { id: 'editor', label: '编辑器 / IDE', kw: /editor|ide|vscode|jetbrains|neovim|plugin/i },
      { id: 'generator', label: '生成器 / 工具箱', kw: /generator|builder|convert|formatter|lint|kit|util|toolbox/i },
      GENERAL,
    ],
  },
  {
    id: 'devops', label: '运维 / DevOps', icon: '🌐', group: 'dev',
    subs: [
      { id: 'cloud', label: '云原生 / 基础设施', kw: /docker|k8s|kubernetes|cloud|terraform|infra|bastion|jump/i },
      { id: 'observe', label: '可观测 / SRE', kw: /monitor|observ|metric|sre|incident|root.?cause|kubeshark/i },
      { id: 'automation', label: '自动化 / CI', kw: /ci|cd|deploy|jenkins|gitea|scheduler|automation|workflow/i },
      GENERAL,
    ],
  },
  {
    id: 'data', label: '数据 / 数据库', icon: '🗄️', group: 'dev',
    subs: [
      { id: 'database', label: '数据库 / 引擎', kw: /database|sql|redis|mongo|doris|databend|seekdb|localdb|nekodb/i },
      { id: 'text2sql', label: 'Text-to-SQL', kw: /text.?to.?sql|chat with|vanna|sql agent/i },
      { id: 'analysis', label: '数据分析', kw: /analysis|analytics|excel|csv|cache|vector|search/i },
      GENERAL,
    ],
  },
  {
    id: 'security', label: '网络安全', icon: '🔒', group: 'dev',
    subs: [
      { id: 'offense', label: '渗透 / 红队', kw: /pentest|red.?team|攻防|渗透|vuln|cve|exploit|hexstrike|红队/i },
      { id: 'ai-sec', label: 'AI 安全', kw: /ai.?security|llm.?sec|prompt.?inject|claude-red|jailbreak/i },
      { id: 'defense', label: '防护 / 合规', kw: /firewall|defense|compliance|privacy|安全|防护/i },
      GENERAL,
    ],
  },
  {
    id: 'language', label: '语言 / 框架', icon: '🧩', group: 'dev',
    subs: [
      { id: 'lib', label: '库 / SDK', kw: /lib|sdk|-lib-|^lib|bytemsg|qcp-|ioc233|rpc233|orm/i },
      { id: 'toolchain', label: '语言 / 编译器', kw: /rust|golang|go233|typescript|parser|compiler|language/i },
      GENERAL,
    ],
  },
  {
    id: 'desktop', label: '客户端 / 桌面', icon: '🖥️', group: 'dev',
    subs: [
      { id: 'cross', label: '跨平台', kw: /wails|electron|tauri|desktop|window|gui/i },
      { id: 'mobile', label: '移动 / Android', kw: /android|ios|mobile|phone|apk/i },
      GENERAL,
    ],
  },

  /* ----------------------------- 游戏 ---------------------------------- */
  {
    id: 'game-dev', label: '游戏开发', icon: '🎮', group: 'game',
    subs: [
      { id: 'engine', label: '引擎 / 框架', kw: /unity|unreal|godot|phaser|roblox|engine|threejs|urp|shader/i },
      { id: 'toolchain', label: '开发工具', kw: /tool|devtools|editor|pipeline|asset|studio|workflow/i },
      { id: 'game-ai', label: '游戏 AI', kw: /ai agent|agent|bot|npc|reinforcement|agent skill/i },
      GENERAL,
    ],
  },
  {
    id: 'game-design', label: '策划 / 数值', icon: '📐', group: 'game',
    subs: [
      { id: 'numerical', label: '数值 / 系统', kw: /数值|numerical|balance|economy|system|策划/i },
      { id: 'narrative', label: '剧情 / 关卡', kw: /剧本|剧情|story|narrative|level|quest|script/i },
      GENERAL,
    ],
  },
  {
    id: 'game-art', label: '美术 / 动画', icon: '🎨', group: 'game',
    subs: [
      { id: 'pixel', label: '像素 / 精灵', kw: /pixel|sprite|aseprite|lospec|像素/i },
      { id: 'animation', label: '动画 / 动效', kw: /anim|live2d|spine|vfx|动效|动画/i },
      { id: 'asset', label: '素材 / 模型', kw: /asset|art|model|texture|素材|美术/i },
      GENERAL,
    ],
  },
  {
    id: 'game-ops', label: '运营 / 增长', icon: '📈', group: 'game',
    subs: [
      { id: 'channel', label: '渠道 / 发行', kw: /渠道|发行|channel|publish|tapTap/i },
      { id: 'community', label: '社区 / 审核', kw: /社区|审核|community|moderation|自动回复/i },
      { id: 'analytics', label: '数据 / 增长', kw: /数据|analysis|growth|analytics|运营/i },
      GENERAL,
    ],
  },

  /* ---------------------------- 设计创意 ------------------------------- */
  {
    id: 'design', label: '设计 / UX', icon: '🎨', group: 'creative',
    subs: [
      { id: 'system', label: '设计系统', kw: /design.md|design.system|token|dtcg|component|uSpec|vuesion/i },
      { id: 'ux', label: 'UI / UX', kw: /ui|ux|figma|wcag|accessib|superdesign|taste/i },
      { id: 'visual', label: '视觉 / 海报', kw: /visual|image|poster|slide|brand|layout/i },
      GENERAL,
    ],
  },
  {
    id: 'content', label: '内容创作', icon: '✍️', group: 'creative',
    subs: [
      { id: 'wechat', label: '公众号 / 新媒体', kw: /wechat|微信|公众号|md2wechat|小红书/i },
      { id: 'story', label: '故事 / IP', kw: /novel|小说|故事|story|comic|漫画/i },
      { id: 'pipeline', label: '内容流水线', kw: /pipeline|content|blog|podcast|content.?ops/i },
      GENERAL,
    ],
  },
  {
    id: 'video', label: '视频 / 多媒体', icon: '🎬', group: 'creative',
    subs: [
      { id: 'generation', label: '视频生成', kw: /video|生成|avatar|digital human|imaginAIry|jellyfish/i },
      { id: 'editing', label: '剪辑 / 工厂', kw: /edit|剪|factory|short.video|批量/i },
      { id: 'script', label: '分镜 / 脚本', kw: /script|分镜|storyboard|scene/i },
      GENERAL,
    ],
  },
  {
    id: 'writing', label: '写作 / 文案', icon: '📝', group: 'creative',
    subs: [
      { id: 'novel', label: '小说 / 剧本', kw: /novel|小说|剧本|fic|story|role.?play|网文|连载/i },
      { id: 'academic', label: '学术 / 论文', kw: /paper|论文|econ|academic|scholar|econom/i },
      { id: 'assistant', label: '写作助手', kw: /writ|grammar|helper|assistant|文案/i },
      GENERAL,
    ],
  },
  {
    id: 'music', label: '音乐 / 音频', icon: '🎵', group: 'creative',
    subs: [
      { id: 'generation', label: '音乐生成', kw: /music|song|musegan|yuE|riffusion|suno|生成/i },
      { id: 'tts', label: 'TTS / 语音', kw: /tts|speech|voice|audio|melotts|whisper|语音|配音/i },
      GENERAL,
    ],
  },
  {
    id: 'translate', label: '翻译 / 本地化', icon: '🌍', group: 'creative',
    subs: [
      { id: 'engine', label: '翻译引擎', kw: /translat|argos|libretranslate|localiz|翻译/i },
      GENERAL,
    ],
  },

  /* ---------------------------- 专业领域 ------------------------------- */
  {
    id: 'legal', label: '法律', icon: '⚖️', group: 'pro',
    subs: [
      { id: 'legal-ai', label: '法律 AI 平台', kw: /legal ai|legalai|法律|law|legal.?agent|mike|legalwork/i },
      { id: 'contract', label: '合同审查', kw: /contract|合同|redline|审查|legal.?document/i },
      { id: 'legal-kb', label: '法规 / 知识库', kw: /awesome|resource|knowledge|法规|知识库|legaltech|法律.?资源/i },
      GENERAL,
    ],
  },
  {
    id: 'finance', label: '金融 / 财务', icon: '💰', group: 'pro',
    subs: [
      { id: 'quant', label: '量化交易', kw: /quant|trading|backtest|hikyuu|akquant|策略|交易/i },
      { id: 'finllm', label: '金融大模型', kw: /llm|finllm|gpt|agent|fin.?ai/i },
      { id: 'research', label: '投研 / 分析', kw: /research|analysis|finance|financial|financial.?market/i },
      GENERAL,
    ],
  },
  {
    id: 'medical', label: '医疗 / 健康', icon: '🏥', group: 'pro',
    subs: [
      { id: 'imaging', label: '医学影像', kw: /imaging|image|torchio|monai|nitrain/i },
      { id: 'clinical', label: '临床 / EHR', kw: /clinical|ehr|scribe|patient|healthcare|openmed|pyhealth/i },
      GENERAL,
    ],
  },
  {
    id: 'education', label: '教育', icon: '🎓', group: 'pro',
    subs: [
      { id: 'tutor', label: 'AI 导师', kw: /tutor|tutorial|教学|辅导/i },
      { id: 'learning', label: '学习工具', kw: /learn|education|study|whiteboard|学习/i },
      GENERAL,
    ],
  },
  {
    id: 'research', label: '研究 / 学术', icon: '🔬', group: 'pro',
    subs: [
      { id: 'automation', label: '科研自动化', kw: /scientist|automation|experiment|research|science|science-plugin/i },
      { id: 'paper', label: '论文工具', kw: /paper|rebuttal|briefing|citation|论文/i },
      GENERAL,
    ],
  },
  {
    id: 'hr', label: '招聘 / HR', icon: '🧑‍💼', group: 'pro',
    subs: [
      { id: 'hiring', label: '招聘 / 面试', kw: /hiring|recruit|interview|面试|招聘|hr.?skill/i },
      GENERAL,
    ],
  },
  {
    id: 'sales', label: '销售 / CRM', icon: '🤝', group: 'pro',
    subs: [
      { id: 'crm', label: 'CRM 系统', kw: /crm|relaticle|deskcomm/i },
      { id: 'outreach', label: '获客 / 外呼', kw: /outreach|lead|sdr|sales|销售|获客/i },
      GENERAL,
    ],
  },
  {
    id: 'realestate', label: '房地产', icon: '🏠', group: 'pro',
    subs: [
      { id: 'property', label: '房产分析', kw: /real.?estate|property|cre|房产|地产|underwriting/i },
      GENERAL,
    ],
  },
  {
    id: 'product', label: '产品 / 运营', icon: '📊', group: 'pro',
    subs: [
      { id: 'management', label: '产品管理', kw: /product|management|roadmap|prd|产品/i },
      { id: 'ops', label: '运营 / 增长', kw: /ops|growth|运营|增长/i },
      GENERAL,
    ],
  },
  {
    id: 'marketing', label: '市场营销', icon: '📣', group: 'pro',
    subs: [
      { id: 'growth', label: '增长 / 销售', kw: /growth|sales|lead|outreach|e.?commerce|电商/i },
      { id: 'seo', label: 'SEO / 内容营销', kw: /seo|youtube|content|marketing|营销/i },
      { id: 'automation', label: '营销自动化', kw: /automat|n8n|workflow|template/i },
      GENERAL,
    ],
  },

  /* ---------------------------- 效率生活 ------------------------------- */
  {
    id: 'efficiency', label: '效率工具', icon: '⚡', group: 'life',
    subs: [
      { id: 'workflow', label: '工作流 / 自动化', kw: /workflow|automat|scheduler|task|kanban|n8n/i },
      { id: 'utils', label: '实用工具', kw: /note|clipboard|password|shortcut|quick|switch|tool/i },
      GENERAL,
    ],
  },
  {
    id: 'learn', label: '学习 / 资料', icon: '📚', group: 'life',
    subs: [
      { id: 'awesome', label: '精选清单', kw: /awesome|curated|collection|精选|清单/i },
      { id: 'guide', label: '指南 / 教程', kw: /guide|tutorial|handbook|how.?to|cookbook|指南|教程/i },
      GENERAL,
    ],
  },
  { id: 'other', label: '其他', icon: '📦', group: 'life', subs: [GENERAL] },
];

/* ------------------------------------------------------------------ */
/* Domain classification — ORDER MATTERS.                              */
/* Specific professional domains first, generic AI/dev terms last.     */
/* ------------------------------------------------------------------ */
export const DOMAIN_RULES = [
  ['legal',      /\blegal\b|\blaw\b|\blaws\b|律师|法务|法律|合同|法规|legaltech|redline|软著|合规/i],
  ['medical',    /medical|health|clinical|patient|ehr|medical.?image|医疗|医学|健康|临床|pyhealth|openmed|torchio/i],
  ['finance',    /financ|quant|trading|stock|invest|理财|金融|财务|交易|量化|基金|证券|finllm|hikyuu|akquant/i],
  ['education',  /educat|tutor|teach|学生|教学|教育|学习平台|tutorial.?generator/i],
  ['research',   /scientist|research|science|paper|学术|科研|论文|实验|rebuttal|citation/i],
  ['game-art',   /pixel.?art|像素|sprite|aseprite|lospec|live2d|spine|动画|动效|美术|素材|anim233/i],
  ['game-design',/game.?design|数值|策划|narrative|关卡|剧情|game.?script|game.?audit/i],
  ['game-ops',   /tapTap|渠道|社区|审核|自动回复|game.?ops|游戏.?运营/i],
  ['game-dev',   /game|unity|unreal|godot|roblox|phaser|gamedev|游戏|引擎|割草|minigame|graphify233|threejs/i],
  ['security',   /security|vuln|cve|pentest|攻防|安全|渗透|firewall|red.?team|hexstrike|hack|safe233/i],
  ['music',      /music|song|audio|tts|speech|voice|musegan|riffusion|suno|melotts|音乐|语音|配音/i],
  ['video',      /video|短视频|视频|avatar|digital.?human|jellyfish|imaginAIry|剪辑|分镜/i],
  ['translate',  /translat|localiz|argos|libretranslate|翻译|本地化/i],
  ['writing',    /novel|小说|写小说|文|剧本|paper.?writ|econ.?writ|grammar|文案|网文|连载|writing/i],
  ['realestate', /real.?estate|property|cre agent|房产|地产|underwriting|zillow/i],
  ['hr',         /hiring|recruit|interview|面试官|招聘|人才|hr.?skill/i],
  ['sales',      /\bcrm\b|sales.?force|sdr|outreach|销售|获客|deskcomm|relaticle/i],
  ['marketing',  /market|seo|营销|增长|电商|e.?commerce|lead.?gen|n8n.?template/i],
  ['design',     /design|ui|ux|figma|视觉|海报|样式|主题|icon|字体|taste|superdesign|uspec/i],
  ['prompt',     /prompt|提示词|context.?engineer|上下文工程|in.?context.?learning/i],
  ['rag',        /rag|retriev|knowledge.?graph|知识图谱|graphify|graphrag|lightrag|ragflow/i],
  ['frontend',   /frontend|react|vue|vite|next|nuxt|前端|slide|scroll.?craft|shadcn|tailwind/i],
  ['backend',    /backend|api|fastapi|django|express|后端|server|微服务/i],
  ['data',       /database|db|sql|redis|mongo|cache|data|数据|excel|csv|vector|search|vanna|doris|databend/i],
  ['devops',     /devops|deploy|server|ssh|jump|ops|vpn|proxy|network|monitor|docker|k8s|linux|ci|cd|cloud|frp|scheduler|sentinel|kubeshark|chaterm/i],
  ['desktop',    /desktop|wails|electron|tauri|window|gui|client|android|ios|mobile|phone|apk|launcher/i],
  ['language',   /^lib|lib-|sdk|bytemsg|qcp-|rust|golang|go233|typescript|parser|compiler|ioc233|rpc233|orm/i],
  ['devtools',   /cli|tool|toolkit|helper|generator|builder|debug|editor|plugin|vscode|ide|kit|util|convert|formatter|lint|build|codegraph|archanim|rcode|catsh|git-next/i],
  ['efficiency', /note|task|kanban|scheduler|clipboard|password|shortcut|quick|效率|自动化|automation|workflow|cc-switch/i],
  ['learn',      /awesome|learn|tutorial|guide|book|handbook|reference|学习|指南|教程|资料|wiki|study/i],
  ['content',    /video|novel|script|write|写作|小说|剧本|漫画|wechat|微信|md2|markdown|translate|paper|blog|podcast|tts|voice|content|content.?ops/i],
  ['llm-app',    /llm|ai.?app|应用|multimodal|多模态|agentic.?app/i],
  ['product',    /product|产品|roadmap|prd/i],
  ['ai-agent',   /agent|skill|claude|codex|copilot|mcp|大模型|智能体|deepseek|openclaw|hermes|superpower|llm.?apps|dsh|skill233|agentwiki|memory/i],
];

/* Overrides for repos whose name/description alone is ambiguous. */
export const DOMAIN_OVERRIDES = {
  'open-legal-products/mike': 'legal',
  'sunlabuiuc/PyHealth': 'medical',
  'maziyarpanahi/openmed': 'medical',
  'TauricResearch/TradingAgents': 'finance',
  'fasiondog/hikyuu': 'finance',
  'georgezouq/awesome-ai-in-finance': 'finance',
  'FudanDISC/DISC-FinLLM': 'finance',
  'vanna-ai/vanna': 'data',
  'apache/doris': 'data',
  'oceanbase/seekdb': 'data',
  'databendlabs/databend': 'data',
  'hkuds/LightRAG': 'rag',
  'infiniflow/ragflow': 'rag',
  'microsoft/graphrag': 'rag',
  'VoltAgent/awesome-design-md': 'design',
  'aseprite/aseprite': 'game-art',
  'lospec/pixel-editor': 'game-art',
  'Donchitos/Claude-Code-Game-Studios': 'game-dev',
  'SerpentAI/SerpentAI': 'game-dev',
  'YILS-LIN/short-video-factory': 'video',
  'Forget-C/Jellyfish': 'video',
  'JushBJJ/Mr.-Ranedeer-AI-Tutor': 'education',
  'SPYfighting/dsh-science-plugin': 'research',
  'engineering-management/awesome-engineering-management': 'product',
  'YSGStudyHards/Awesome-Tools': 'efficiency',
  'devtoolsd/awesome-devtools': 'devtools',
  'argosopentech/argos-translate': 'translate',
  'libretranslate/LibreTranslate': 'translate',
  'neko233-com/graphify233': 'rag',
  'neko233-com/skill-ux-for-app-by-web': 'design',
};

/* Per-repo sub-group overrides (rare; keyword sub-classifier handles most). */
export const SUB_OVERRIDES = {
  'gamedev-skills/awesome-gamedev-agent-skills': 'toolchain',
  'Donchitos/Claude-Code-Game-Studios': 'game-ai',
  'open-legal-products/mike': 'legal-ai',
  'CSHaitao/Awesome-LegalAI-Resources': 'legal-kb',
  'lilialla/awesome-legal-ai-zh': 'legal-kb',
  'Vaquill-AI/awesome-legaltech': 'legal-kb',
  'rohasnagpal/legal-ai-skills': 'legal-ai',
  'sunyifeisb-art/legalwork': 'legal-ai',
  'Ginowine/redline': 'contract',
};

export function classifyDomain(text, fullName = '') {
  const key = Object.keys(DOMAIN_OVERRIDES).find((k) => k.toLowerCase() === fullName.toLowerCase());
  if (key) return DOMAIN_OVERRIDES[key];
  for (const [id, re] of DOMAIN_RULES) if (re.test(text)) return id;
  return 'other';
}

export function classifySubGroup(domainId, text, fullName = '') {
  const domain = DOMAINS.find((d) => d.id === domainId);
  if (!domain) return 'general';
  const key = Object.keys(SUB_OVERRIDES).find((k) => k.toLowerCase() === fullName.toLowerCase());
  if (key) return SUB_OVERRIDES[key];
  for (const sub of domain.subs) {
    if (sub.kw && sub.kw.test(text)) return sub.id;
  }
  return domain.subs[domain.subs.length - 1].id; // GENERAL
}
