# skill233 · Agent Skill 超链接中心

> 线上地址：**https://skill.neko233.com**
>
> neko233 自用 Agent Skill + 业内优质 Skill 的超链接索引站。**Vercel 风格**极简界面，纯前端、无后端，毫秒级检索，点击直达源仓库。

## 特性

- **左侧垂直 Tab**：按「分组 → 领域 → 子分组」三级组织，分组可折叠、带实时计数，点击即筛选；移动端自动收起为抽屉式导航。
- **全领域覆盖**：6 大分组、35 个领域、78 个子分组，覆盖 AI 智能、软件工程、游戏（开发/策划/美术/运营）、设计创意、专业领域（**法律**、金融、医疗、教育、研究、产品、营销、招聘、销售、房地产）、效率生活。
- **超快检索**：构建期生成倒排索引（5k+ token），运行时只切分查询词，中文分词（一元 + 二元）、英文前缀匹配、多词 AND，实测毫秒级。
- **两类来源**：`我的`（neko233-com 公开仓库）+ `业内`（124 个社区优质 Skill 集合，Star 数实时拉取）。
- **超链接中心**：每张卡片都是指向 GitHub 的外链；点开详情可一键打开仓库、复制安装命令。
- **分组浏览首页**：默认按领域分区展示（每区精选 9 个 + 「查看全部」），点击后进入该领域的子分组视图。
- **深链接**：每个分组/领域/子分组都有 URL（如 `#/domain/legal`、`#/domain/game-art/sub/pixel`、`#/group/pro`），可直接分享与前进后退。
- **Vercel 风格**：纯黑白、Geist 字体、发丝边框、几何网格背景、⌘K 快捷搜索。
- **零后端**：静态 JSON + Cloudflare Pages，无数据库、无 API。

### 三级分类示例

```
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
- GitHub Actions（`.github/workflows/deploy.yml`）在 push 到 `main` 时自动重采数据、构建并部署。

## 部署

### Cloudflare Pages（手动）

```bash
npm run build
npx wrangler pages deploy dist --project-name skill233-all --branch main
```

### 绑定自定义域名

`skill.neko233.com` 已通过 Cloudflare API 绑定到本项目（Pages 识别到 `neko233.com` zone 后会自动创建 CNAME 并签发证书）。新增域名时可参考：

```bash
# wrangler 4.x 已移除 pages domain add，用 API 添加：
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/skill233-all/domains" \
  -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  --data '{"name":"skill.neko233.com"}'
```

- 域名状态会从 `initializing → pending → active`，HTTP 验证与 SSL 签发通常需要几分钟到数十分钟，属 Cloudflare 侧异步流程。
- 验证阶段用 `https://skill233-all.pages.dev` 访问不受影响。
- 本环境存在强制 HTTP(S) 代理，会导致 Cloudflare API 返回 500/522；运行 `wrangler` 前需 `unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY all_proxy`，并指定 `XDG_CONFIG_HOME` 指向已登录的 wrangler 配置目录。

### GitHub Actions 自动部署

在仓库 Settings → Secrets 配置：

- `CLOUDFLARE_API_TOKEN`（需 `Pages:Edit` 权限）
- `CLOUDFLARE_ACCOUNT_ID`

## 目录结构

```
.
├── index.html              # 页面壳
├── src/
│   ├── main.ts             # 应用逻辑、渲染、交互
│   ├── search.ts           # 超快检索引擎
│   ├── styles.css          # Vercel 风格样式
│   ├── lib/
│   │   ├── tokenize.js     # 构建/运行共享分词器
│   │   └── taxonomy.mjs    # 分组→领域→子分组 分类体系（唯一真源）
│   ├── data/               # 构建生成：catalog / search-index / meta
│   └── types.ts
├── scripts/
│   ├── fetch-data.mjs      # gh 数据采集
│   └── build-catalog.mjs   # 目录 + 索引生成
├── data/                   # 原始采集数据（gh-mine.json / curated-raw.jsonl）
├── public/_headers         # Cloudflare 缓存/安全头
├── wrangler.jsonc          # Pages 配置
└── .github/workflows/      # 自动部署
```

## License

MIT © neko233-com
