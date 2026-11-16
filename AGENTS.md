# Contract · skill233-all

本文件是 skill233-all 仓库的**行为契约**，用中文书写，以「强制」分节。凡标为强制的条款，必须同时满足：本文件有描述、验证脚本有检查、README 有说明；三者不一致时以本文件为准并立即同步另两者。

本仓库是 **Skill 与软件工具超链接中心**（skill.neko233.com），纯前端、无后端、无 CI、无 GitHub Actions。

---

## 强制：发布与自动化

1. **禁止 GitHub Actions / CI 自动发布**。仓库不得包含 `.github/workflows/` 下的任何 workflow，也不得包含 `.gitlab-ci.yml`、`.travis.yml`、`Jenkinsfile`、`circle.yml`、`netlify.toml` 等任何 CI/CD 自动发布配置。原因：GitHub Actions 额度不足，且本项目采用手动可控发布。
2. **禁止在 README 或任何配置中出现** `GitHub Actions`、`actions/checkout`、`wrangler-action`、`workflow_dispatch`、`secrets.CLOUDFLARE_*`、`自动部署` 等 CI 发布相关表述或配置。
3. **发布与 Cloudflare 操作只能在本机执行**。唯一发布入口是**本机 Cloudflare CLI（wrangler）**：
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name skill233-all --branch main
   ```
   不得使用 GitHub Actions、任何 CI/CD 服务、云端流水线或第三方自动发布机器人。`package.json` 的 `deploy` 脚本必须是上述 wrangler 手动部署，且不得依赖 `wrangler-action` 或 `@actions/*`。若 wrangler 4.x 不提供某项能力（如 Pages 自定义域名绑定），只能在本机手动调用 Cloudflare API 或在 Cloudflare 面板操作，且**不得写入任何自动化配置**。
4. **数据更新与发布解耦**。`npm run data:fetch` / `data:build` 只更新本地 `src/data/*.json`，不会触发任何自动发布；发布时机由人决定。

## 强制：本地环境与代理

5. 本机存在强制 HTTP(S) 代理，会让 Cloudflare API / wrangler 返回 500/522。执行任何 wrangler 或 Cloudflare API 操作前，**必须**先清除代理变量并指定已登录的 wrangler 配置目录：
   ```bash
   unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY all_proxy
   export XDG_CONFIG_HOME="/c/Users/14170"
   ```
   （wrangler 会拼接 `.wrangler/config`，登录态实际位于 `/c/Users/14170/.wrangler/config/default.toml`。若 OAuth 已过期或 refreshtoken 失效，需先重新 `npx wrangler login`，或提供具备 Cloudflare Pages:Edit 权限的 API Token 并用 `CLOUDFLARE_API_TOKEN` 传入，不得改用 CI 发布。）
6. Cloudflare OAuth token 只具 `zone:read`、`pages:write` 等 scope，**无 DNS 写入权限**。自定义域名 `skill.neko233.com` / `skills.neko233.com` 需要 `CNAME → skill233-all.pages.dev`（proxied）才能通过验证；此 CNAME 必须由具备 DNS:Edit 权限的人手动添加，不得假设 token 能自建。

## 强制：数据与分类

7. `src/lib/taxonomy.mjs` 是「分组 → 领域 → 子分组」分类体系的唯一真源；`src/lib/tools-data.mjs` 是软件工具数据的唯一真源。新增领域/工具必须先改真源再 `npm run data:build`，不得手改 `src/data/*.json`（构建产物）。
8. 每条工具记录必须填写文档 URL（`T(...)` 第 10 位）与备选工具名数组（第 11 位）；构建期保证所有条目有 `docs`、每款工具有至少 3 个 `alts`。卡片提供「文档」快捷入口，详情抽屉提供「去这里看文档」与「备选工具」入口。
9. 检索必须保持毫秒级：构建期生成倒排索引，运行时只切分查询词；构建与运行共用 `src/lib/tokenize.js`。

## 强制：验证

10. 任何改动后，必须运行强制验证脚本，退出码 0 才允许提交：
    ```bash
    node tools/verify_repo_contract.mjs
    ```
    验证脚本位于 `tools/verify_repo_contract.mjs`，覆盖上述「发布与自动化」全部条款及仓库结构约束。规则只有写进该脚本才生效；仅写在本文件里的条款属于偏好，不构成约束。

---

如果产品行为需要改变这些约束，先更新本文件、验证脚本和 README，再改实现。
