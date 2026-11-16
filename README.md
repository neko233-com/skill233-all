# skill233 · Agent Skill 超链接中心

> 线上地址：**https://skill.neko233.com**
>
> neko233 自用 Agent Skill + 业内优质 Skill 的超链接索引站。**Vercel 风格**极简界面，纯前端、无后端，毫秒级检索，点击直达源仓库。

## 特性

- **超快检索**：构建期生成倒排索引（3k+ token），运行时只切分查询词，中文分词（一元 + 二元）、英文前缀匹配、多词 AND，实测毫秒级。
- **两类来源**：`我的`（neko233-com 公开仓库）+ `业内`（社区优质 Skill 集合，Star 数实时拉取）。
- **13 个业务领域**：AI/Agent、游戏开发、设计/UX、开发工具、内容创作、效率、安全、数据、运维、客户端、语言框架、学习资料、其他。
- **超链接中心**：每张卡片都是指向 GitHub 的外链；点开详情可一键打开仓库、复制安装命令。
- **Vercel 风格**：纯黑白、Geist 字体、发丝边框、几何网格背景、⌘K 快捷搜索。
- **零后端**：静态 JSON + Cloudflare Pages，无数据库、无 API。

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
- GitHub Actions（`.github/workflows/deploy.yml`）在 push 到 `main` 时自动重采数据、构建并部署。

## 部署

### Cloudflare Pages（手动）

```bash
npm run build
npx wrangler pages deploy dist --project-name skill233-all --branch main
```

### 绑定自定义域名

```bash
npx wrangler pages domain add skill.neko233.com --project-name skill233-all
```

随后在 DNS 中添加 CNAME：`skill.neko233.com` → `skill233-all.pages.dev`。

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
│   ├── lib/tokenize.js     # 构建/运行共享分词器
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
