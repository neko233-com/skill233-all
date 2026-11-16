#!/usr/bin/env node
/**
 * verify_repo_contract.mjs — 强制验证脚本（静态检查，无需网络/凭据）。
 *
 * 校验仓库是否遵守 AGENTS.md 中的 Contract 约束，核心是：
 * 本仓库禁止一切 GitHub Actions / CI 自动发布，发布只在本地手动执行 wrangler。
 *
 * 用法： node tools/verify_repo_contract.mjs
 * 退出码：0 = 全部通过；1 = 存在违规。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch { return null; }
};
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

const results = [];
const rule = (id, label, ok, detail = '') => results.push({ id, label, ok: !!ok, detail });

/* R1 — 禁止 GitHub Actions workflow 文件 */
const wfDir = path.join(ROOT, '.github', 'workflows');
const wfFiles = fs.existsSync(wfDir)
  ? fs.readdirSync(wfDir, { recursive: true }).filter((f) => /\.(ya?ml)$/i.test(String(f)))
  : [];
rule('R1', '.github/workflows 下不得存在任何 CI workflow',
  wfFiles.length === 0, wfFiles.length ? `发现: ${wfFiles.join(', ')}` : '');

/* R2 — 禁止其他常见 CI 配置 */
const ciPaths = [
  '.gitlab-ci.yml', '.travis.yml', 'appveyor.yml', 'azure-pipelines.yml',
  'bitbucket-pipelines.yml', 'Jenkinsfile', 'circle.yml', '.circleci/config.yml',
  'cloudbuild.yaml', 'netlify.toml',
];
const ciFound = ciPaths.filter((p) => exists(p));
rule('R2', '不得存在其他 CI/CD 自动发布配置', ciFound.length === 0,
  ciFound.length ? `发现: ${ciFound.join(', ')}` : '');

/* R3 — README 不得残留 Actions「自动发布」配置或 GitHub Secrets 用法。
   允许出现否定式表述（如「不使用 GitHub Actions」）与手动 API 示例中的 CF token。 */
const readme = read('README.md') || '';
const badText = [];
if (/uses:\s*actions\//.test(readme)) badText.push('uses: actions/');
if (/wrangler-action/.test(readme)) badText.push('wrangler-action');
if (/workflow_dispatch/.test(readme)) badText.push('workflow_dispatch');
if (/secrets\.CLOUDFLARE/.test(readme)) badText.push('secrets.CLOUDFLARE');
if (/GitHub Actions 自动部署/.test(readme)) badText.push('GitHub Actions 自动部署');
if (/Settings\s*→?\s*Secrets|仓库\s*Settings.*Secrets/.test(readme)) badText.push('Settings/Secrets 配置指引');
rule('R3', 'README 不得描述 GitHub Actions / CI 自动发布或 Secrets', badText.length === 0,
  badText.length ? `命中: ${badText.join(', ')}` : '');

/* R4 — AGENTS.md 必须是 Contract，含「强制」章节与固定结尾 */
const agents = read('AGENTS.md') || '';
const agentsChecks = {
  '标题为 Contract': /^#\s*Contract\b/im.test(agents),
  '含「强制」章节': /^##\s*强制/m.test(agents),
  '含「强制验证」章节': /强制验证/.test(agents),
  '含禁用 CI 条款': /禁止.{0,20}(GitHub\s*Actions|CI)|不(得|允许|使用).{0,20}(GitHub\s*Actions|CI)/i.test(agents),
  '含固定结尾句': agents.trimEnd().endsWith('如果产品行为需要改变这些约束，先更新本文件、验证脚本和 README，再改实现。'),
};
const failedAgents = Object.entries(agentsChecks).filter(([, ok]) => !ok).map(([k]) => k);
rule('R4', 'AGENTS.md 为合规 Contract', failedAgents.length === 0, failedAgents.join('；'));

/* R5 — 强制验证脚本存在且被 AGENTS.md 引用 */
const verifierRel = 'tools/verify_repo_contract.mjs';
rule('R5', '强制验证脚本存在并被 Contract 引用',
  exists(verifierRel) && agents.includes('verify_repo_contract.mjs'));

/* R6 — package.json 发布脚本为手动 wrangler，无 CI 依赖 */
let pkg = {};
try { pkg = JSON.parse(read('package.json') || '{}'); } catch { /* leave empty */ }
const scripts = pkg.scripts || {};
const deployOk = /wrangler\s+pages\s+deploy/.test(scripts.deploy || '');
const noCiDeps = !/wrangler-action|@actions\//.test(JSON.stringify(pkg));
rule('R6', 'package.json deploy 为手动 wrangler 且无 Actions 依赖', deployOk && noCiDeps,
  `deploy = "${scripts.deploy || ''}"`);

/* R7 — wrangler 项目名固定 */
const wranglerCfg = read('wrangler.jsonc') || '';
rule('R7', 'wrangler 项目名为 skill233-all', /skill233-all/.test(wranglerCfg));

/* R8 — 仓库源代码中不得出现 Actions 触发器语法 */
const srcFiles = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', '.workbuddy', 'data'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|js|mjs|cjs|json|jsonc|md|yml|yaml|html|css)$/i.test(e.name)) srcFiles.push(p);
  }
};
walk(ROOT);
const triggerHits = [];
for (const f of srcFiles) {
  // 本脚本自身、契约与 README 含规则字面量/否定式说明，属于允许的描述文件
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  if (['tools/verify_repo_contract.mjs', 'AGENTS.md', 'README.md'].includes(rel)) continue;
  const txt = fs.readFileSync(f, 'utf8');
  if (/workflow_dispatch|uses:\s*actions\/|uses:\s*cloudflare\/wrangler-action/.test(txt)) {
    triggerHits.push(path.relative(ROOT, f));
  }
}
rule('R8', '仓库中无 Actions 触发器 / action 引用', triggerHits.length === 0,
  triggerHits.length ? `发现: ${triggerHits.join(', ')}` : '');

/* ------------------------------ report ---------------------------------- */
const pass = results.filter((r) => r.ok).length;
console.log('Contract 强制验证（skill233-all）');
console.log('='.repeat(52));
for (const r of results) {
  console.log(`${r.ok ? '✓' : '✗'} [${r.id}] ${r.label}${r.detail ? ` — ${r.detail}` : ''}`);
}
console.log('='.repeat(52));
console.log(`${pass}/${results.length} 条规则通过`);
if (pass !== results.length) {
  console.error('契约验证失败：请按 AGENTS.md 修正后再提交。');
  process.exit(1);
}
console.log('契约验证通过。');
