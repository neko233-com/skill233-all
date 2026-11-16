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

// 2) curated external skill repos
const CURATED = [
  'anthropics/skills', 'mattpocock/skills', 'obra/superpowers', 'addyosmani/agent-skills',
  'ComposioHQ/awesome-claude-skills', 'VoltAgent/awesome-agent-skills', 'github/awesome-copilot',
  'gamedev-skills/awesome-gamedev-agent-skills', 'bergside/awesome-design-skills', 'SnailSploit/Claude-Red',
  'nextlevelbuilder/ui-ux-pro-max-skill', 'Graphify-Labs/graphify', 'OpenMontageInc/OpenMontage',
  'sickn33/agentic-awesome-skills', 'libukai/awesome-agent-skills', 'microsoft/skills',
  'hesreallyhim/awesome-claude-code', 'Shubhamsaboo/awesome-llm-apps', 'tt-a1i/archify',
  'Leonxlnx/taste-skill', 'affaan-m/ECC', 'multica-ai/andrej-karpathy-skills',
  'microsoft/SkillOpt', 'ciembor/agent-rules-books', 'geekjourneyx/md2wechat-skill',
  '0xNyk/awesome-hermes-agent',
];
const lines = [];
for (const r of CURATED) {
  try {
    const raw = gh(['api', `repos/${r}`, '--jq', '{full_name,description,stargazers_count,html_url,language,topics,updated_at,default_branch,owner:(.owner.login)}']);
    lines.push(raw.trim());
  } catch (e) {
    console.warn(`skip ${r}: ${String(e.message).slice(0, 80)}`);
  }
}
fs.writeFileSync(path.join(DATA, 'curated-raw.jsonl'), lines.join('\n') + '\n');
console.log(`fetched ${lines.length} curated repos`);
