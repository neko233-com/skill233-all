# skill233 · Skill 与软件工具超链接中心

> 线上地址：**https://skill.neko233.com**
>
> neko233 自用 Agent Skill + 业内优质 Skill + **241 款好用软件工具**（含 51 款 neko233 自研软件）的超链接索引站，尤其适合非程序人员/编程小白。**每项都附使用文档与备选工具**——不知道怎么用就点「文档」，想货比三家就点「备选」。**Vercel 风格**极简界面，纯前端、无后端，毫秒级检索，点击直达官网或源仓库。

## 特性

- **左侧垂直 Tab**：按「分组 → 领域 → 子分组」三级组织，分组可折叠、带实时计数，点击即筛选；移动端自动收起为抽屉式导航。
- **全领域覆盖**：7 大分组、57 个领域、133 个子分组，覆盖 AI 智能、**实用软件**、软件工程、游戏（开发/策划/美术/运营）、设计创意、专业领域（**法律**、金融、医疗、教育、研究、产品、营销、招聘、销售、房地产）、效率生活。
- **超快检索**：构建期生成倒排索引（7.8k+ token），运行时只切分查询词，中文分词（一元 + 二元）、英文前缀匹配、多词 AND，实测毫秒级。
- **三类来源**：`我的`（neko233-com 公开仓库）+ `业内`（124 个社区优质 Skill 集合）+ `软件工具`（241 款人工精选软件）。
- **📖 每项都有文档**：全部 680 项都带「文档」链接——软件指向官方帮助中心 / 教程 / GitHub Wiki，Skill 指向仓库 README。卡片上有 `📖 文档` 快捷入口一键直达，详情页有醒目的「去这里看文档」卡片并附新手提示。
- **🔁 备选工具**：每款软件至少配 3 个同类备选（共 241 款、720+ 条备选关系），详情页可直接点击备选跳转对比其文档、平台与下载方式，解决「不知道选哪个」的问题。
- **软件工具推荐**：22 个软件领域 / 55 个子分组，覆盖 Windows / macOS / Linux / iOS / Android / Web / 浏览器插件，标注授权类型（开源免费 / 免费 / 免费增值 / 付费）。含 **Clash Verge Rev（电脑）+ Stash / Shadowrocket（iOS）+ Clash Meta for Android / FlClash（安卓）** 全平台方案，以及浏览器、办公、影音、下载、文件管理、系统增强、密码隐私、图片、**PDF、OCR、录屏、远程控制、思维导图、网盘、阅读、日程**、AI 助手、翻译、通讯、编程入门等常用软件。
- **🐈 neko233 专用软件**：51 款自研软件单独成领域，按「代替谁」组织：`proxysss` 代替 Nginx、`git-next` 代替 Git、`buildworld` 代替 Jenkins、`mydb` 代替 MySQL、`localdb` 代替 SQLite、`Wallpaper233` 代替 Wallpaper Engine、`ihub` 代替 Raycast 等；覆盖网络代理、开发编译、运维数据、桌面效率、媒体创作、AI / Agent 六个子分组。
- **超链接中心**：每张卡片都是外链；点开详情可一键打开官网/仓库、复制地址或安装命令。
- **分组浏览首页**：默认按领域分区展示（每区精选 9 个 + 「查看全部」），点击后进入该领域的子分组视图。
- **深链接**：每个分组/领域/子分组都有 URL（如 `#/domain/legal`、`#/domain/game-art/sub/pixel`、`#/group/pro`），可直接分享与前进后退。
- **Vercel 风格**：纯黑白、Geist 字体、发丝边框、几何网格背景、⌘K 快捷搜索。
- **零后端**：静态 JSON + Cloudflare Pages，无数据库、无 API。

### 三级分类示例

```
实用软件 (tools)  ← 面向非程序人员
├── 网络代理       → 电脑客户端（Clash Verge Rev）/ iPhone·iPad（Stash）/ 安卓（FlClash）/ 内核
├── 浏览器         → 主流浏览器 / 隐私浏览器 / 必装插件
├── 办公协作       → 办公套件 / 团队协作 / 文档笔记
├── 影音播放       → 视频播放器 / 在线视频 / 音乐平台
├── 下载传输 / 文件管理 / 系统增强 / 密码隐私（含 2FA）/ 图片工具
├── PDF 工具       → 阅读编辑（Acrobat/Foxit/PDF24）/ 转换处理（Smallpdf/ILovePDF）
├── OCR / 扫描     → Umi-OCR / PaddleOCR / 白描 / 扫描全能王
├── 录屏 / 直播    → OBS / Bandicam / Loom
├── 远程控制       → RustDesk / TeamViewer / AnyDesk / ToDesk / 向日葵
├── 思维导图 / 白板 → XMind / Excalidraw / Miro / boardmix
├── 网盘 / 云存储  → 百度/阿里/夸克网盘 / Google Drive / OneDrive / rclone / alist
├── 阅读 / 电子书  → 微信读书 / 掌阅 / Calibre
├── 日程 / 待办    → 滴答清单 / Microsoft To Do / Forest / 番茄 ToDo
├── AI 助手        → AI 对话（ChatGPT/Claude/DeepSeek）/ AI 绘画（MJ/SD/ComfyUI）/ AI 办公
├── neko233 专用软件 → 网络（proxysss/netflow）/ 开发（git-next/buildworld/cnext）/ 运维（mydb/localdb/metrics233-all）/ 桌面（ihub/Wallpaper233/mdx）/ 媒体 / Agent
└── 翻译词典 / 通讯社交 / 编程入门（含 API 调试）

专业领域 (pro)
├── 法律 (legal)       → 法律 AI 平台 / 合同审查 / 法规·知识库 / 综合
├── 金融 / 财务        → 量化交易 / 金融大模型 / 投研分析
├── 医疗 / 健康        → 医学影像 / 临床·EHR
├── 招聘 / HR          → 招聘·面试
├── 销售 / CRM         → CRM 系统 / 获客·外呼
└── 房地产             → 房产分析

游戏 (game)
├── 游戏开发           → 引擎框架 / 开发工具 / 游戏 AI
├── 策划 / 数值        → 数值系统 / 剧情关卡
├── 美术 / 动画        → 像素精灵 / 动画动效 / 素材模型
└── 运营 / 增长        → 渠道发行 / 社区审核 / 数据增长
```

## 技术栈

- **构建**：Vite+（`vite-plus` / `vp`，Rolldown 内核）
- **语言**：TypeScript + 原生 DOM（无框架，最小化体积）
- **部署**：Cloudflare Pages（静态），自定义域 `skill.neko233.com`
- **数据**：`gh` CLI 采集 GitHub → 构建期生成静态索引

## 本地开发

```bash
npm install
npm run dev        # 本地开发服务器
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

### 在本仓库内并列开发兄弟 skill 仓库

为了方便直接修改本系列的 skill 仓库而不用在上级目录拉一堆兄弟目录，可以把它们
clone 到本仓库根目录下就地开发。`.gitignore` 已忽略 `skill233-*/`、`skill-*/`、
`dsh-plugin-*/`、`mcp233-*/`、`tool233-*/`、`ihub-plugin-*/` 前缀的子目录，
这些目录都是独立 git 仓库，不会被误纳入本仓库的版本管理。例如：

```bash
# 在本仓库根目录执行，得到 ./skill233-check-company-name/（已被 git 忽略）
git clone https://github.com/neko233-com/skill233-check-company-name.git
```

新增其他仓库时，若目录名前缀不在上述列表中，在 `.gitignore` 的「本地并列开发的子 git 仓库」段落补一条即可。
注意：站点目录里的「引用」是真源数据（`data/gh-mine.json` + `src/lib/taxonomy.mjs`）经 `npm run data:build` 生成的，
与本地是否 clone 子仓库无关。

## 数据更新

需要已登录 `gh auth login`（只读 public 数据）：

```bash
npm run data:fetch   # 用 gh 拉取所有公开仓库 + 精选仓库元数据
npm run data:build   # 生成 catalog.json / search-index.json / meta.json
npm run build        # 重新构建站点
```

- 自己仓库：`gh repo list neko233-com --visibility public`
- 业内精选：维护在 `scripts/fetch-data.mjs` 的 `CURATED` 数组，中文简介与领域归类在 `scripts/build-catalog.mjs` 的 `CURATED_OVERRIDES`。
- **分类体系**：`src/lib/taxonomy.mjs` 是唯一的分类真源，定义分组、领域、子分组、分类规则（顺序敏感：专业领域在前，通用 AI/dev 在后）及特殊仓库覆盖。新增领域只需在此文件添加，再 `npm run data:build`。
- **软件工具**：维护在 `src/lib/tools-data.mjs`。每条 `T(...)` 记录的字段依次为：`名称, 中文简介, 官网URL, 领域id, 子分组id, 平台数组, 授权, 标签, 仓库, 文档URL, 备选工具名数组`。其中：
  - `文档URL`（第 10 位）指向官方帮助中心 / 教程 / Wiki，**务必填写**；构建期会为所有条目补上文档链接（Skill 自动指向仓库 README）。
  - `备选工具名数组`（第 11 位）填同类竞品的名称，构建期自动解析成可点击的备选链接；未填或不足 3 个时，会从同一子分组/领域自动补足。
  - 平台值与搜索别名见文件头 `PLATFORM_LABELS` / `PLATFORM_ALIASES`。
  - 此为人工精选数据，不随 `data:fetch` 覆盖。新增领域需同时在 `src/lib/taxonomy.mjs` 的 `DOMAINS` 注册领域与子分组。
- **发布方式**：本仓库**不使用 GitHub Actions / CI 自动发布**（GitHub 额度不足）。唯一发布入口是**本机 Cloudflare CLI（wrangler）**，由人在本机手动执行；数据更新只改本地 JSON，见「部署」一节。约束见根目录 `AGENTS.md`，可用 `node tools/verify_repo_contract.mjs` 验证。

## 部署

### Cloudflare Pages（本机 CLI 手动发布）

唯一发布通道是**本机 Cloudflare CLI（wrangler）**，不使用 GitHub Actions / CI / 云端流水线：

```bash
npm run build
npx wrangler pages deploy dist --project-name skill233-all --branch main
```

### 绑定自定义域名（需 DNS:Edit 权限，手动）

`skill.neko233.com` 与 `skills.neko233.com` 已通过 Cloudflare API 绑定到本项目，但 Pages 域名验证需要一条 CNAME：

```
类型   名称                     目标                       代理
CNAME  skill.neko233.com       skill233-all.pages.dev     已代理（橙云）
CNAME  skills.neko233.com      skill233-all.pages.dev     已代理（橙云）
```

**当前状态**：域名已绑定但验证 `pending`，Cloudflare 报 `CNAME record not set`，因此访问返回 522。本机 Cloudflare OAuth token 只有 `zone:read` / `pages:write`，**无 DNS 写入权限**，无法自建 CNAME。请在 Cloudflare 面板（或使用具备 `Zone:DNS:Edit` 的 API token）手动添加上面两条 CNAME；验证通过后状态转 `active`，522 即消失。

添加域名的 API（仅绑定域名，不创建 DNS 记录）：

```bash
# wrangler 4.x 已移除 pages domain add，用 API 添加：
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY all_proxy
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/skill233-all/domains" \
  -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  --data '{"name":"skills.neko233.com"}'
```

- 域名状态：`initializing → pending → active`；CNAME 就绪后 HTTP 验证与 SSL 签发自动完成。
- 验证阶段用 `https://skill233-all.pages.dev` 访问不受影响。
- 本环境存在强制 HTTP(S) 代理，会导致 Cloudflare API 返回 500/522；运行 `wrangler` 或 CF API 前需 `unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY all_proxy`，并 `export XDG_CONFIG_HOME="/c/Users/14170"`（wrangler 拼接 `.wrangler/config`，登录态在 `~/.wrangler/config/default.toml`）。若 OAuth 已过期，需先 `npx wrangler login` 或提供具备 Cloudflare Pages:Edit 权限的 `CLOUDFLARE_API_TOKEN`。

## 契约与验证

根目录 `AGENTS.md` 是本仓库的行为契约（中文，强制分节）。核心约束：**禁止 GitHub Actions / CI 自动发布**，发布只能用本机 Cloudflare CLI（wrangler）手动执行。任何改动后运行：

```bash
node tools/verify_repo_contract.mjs
```

退出码 0 表示契约通过；规则必须写进该脚本才生效。

## 目录结构

```
.
├── AGENTS.md               # 仓库行为契约（强制分节，禁止 CI 自动发布）
├── index.html              # 页面壳
├── src/
│   ├── main.ts             # 应用逻辑、渲染、交互
│   ├── search.ts           # 超快检索引擎
│   ├── styles.css          # Vercel 风格样式
│   ├── lib/
│   │   ├── tokenize.js     # 构建/运行共享分词器
│   │   ├── taxonomy.mjs    # 分组→领域→子分组 分类体系（唯一真源）
│   │   └── tools-data.mjs  # 241 款精选软件工具链接（含 51 款 neko233 自研，含文档 + 备选，人工维护）
│   ├── data/               # 构建生成：catalog / search-index / meta
│   └── types.ts
├── scripts/
│   ├── fetch-data.mjs      # gh 数据采集
│   └── build-catalog.mjs   # 目录 + 索引生成
├── data/                   # 原始采集数据（gh-mine.json / curated-raw.jsonl）
├── public/_headers         # Cloudflare 缓存/安全头
├── wrangler.jsonc          # Pages 配置
└── tools/
    └── verify_repo_contract.mjs  # 契约强制验证脚本（禁止 CI 等）
```

## License

MIT © neko233-com
