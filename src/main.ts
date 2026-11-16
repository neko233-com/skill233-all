import './styles.css';
import catalog from './data/catalog.json';
import index from './data/search-index.json';
import meta from './data/meta.json';
import { SearchEngine } from './search';
import type { Skill, Category, Meta, SearchIndex } from './types';

const skills = catalog as Skill[];
const metaData = meta as Meta;
const categories = metaData.categories;
const engine = new SearchEngine(skills, index as SearchIndex);

const catById = new Map<string, Category>(categories.map((c) => [c.id, c]));

const state = {
  query: '',
  category: 'all',
  source: 'all',
  sort: 'smart',
};

/* ----------------------------- icons ----------------------------- */
const ICONS = {
  triangle: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L22 20H2L12 3Z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.2 6.8.8-5 4.8 1.3 6.8L12 17.7 6 20.6l1.3-6.8-5-4.8 6.8-.8L12 2z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.48A10.26 10.26 0 0022 12.25C22 6.58 17.52 2 12 2z"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"/></svg>`,
  docs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h11l5 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"/><path d="M14 4v6h6"/></svg>`,
};

function esc(s: string): string {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function fmtStars(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}m`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

function langColor(lang: string): string {
  const map: Record<string, string> = {
    TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5', Go: '#00ADD8',
    Rust: '#dea584', Shell: '#89e051', Python2: '#3572A5', Java: '#b07219',
    Kotlin: '#A97BFF', Csharp: '#178600', 'C#': '#178600', Ruby: '#701516',
    HTML: '#e34c26', CSS: '#563d7c', Swift: '#F05138', Dart: '#00B4AB',
  };
  return map[lang] || '#666';
}

/* ----------------------------- render shell ----------------------------- */
const app = document.getElementById('app')!;
app.innerHTML = `
  <header class="top">
    <div class="wrap top-inner">
      <a class="brand" href="#" aria-label="skill233 home">
        <span class="brand-mark">${ICONS.triangle}</span>
        <span>skill233</span>
        <span class="sep">/</span>
        <small>Agent Skill 超链接中心</small>
      </a>
      <div class="top-spacer"></div>
      <div class="top-stat"><b>${metaData.total}</b> skills · <b>${categories.length}</b> 领域</div>
      <a class="btn-ghost" href="https://github.com/neko233-com/skill233-all" target="_blank" rel="noopener">
        ${ICONS.github} GitHub
      </a>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="wrap">
        <div class="hero-badge"><span class="dot"></span> 纯静态 · 毫秒检索 · 每日更新</div>
        <h1>找到好用的 <span class="dim">Agent Skill</span></h1>
        <p>收录 <b>neko233 自用技能</b> 与 <b>业内优质 Skill</b>，按业务领域分类，<b>一键直达</b>源仓库。</p>
        <div class="searchbox" id="searchbox">
          <span class="s-icon">${ICONS.search}</span>
          <input id="q" type="text" placeholder="搜索 skill、领域、作者、关键词…  例如：游戏 / design / game-design / security" autocomplete="off" spellcheck="false" />
          <div class="kbd"><kbd>⌘</kbd><kbd>K</kbd></div>
          <button class="clear" id="clear" title="清除">✕</button>
        </div>
        <div class="search-meta" id="search-meta"></div>
      </div>
    </section>

    <section class="wrap filters">
      <div class="filter-row" id="source-row">
        <span class="filter-label">来源</span>
      </div>
      <div class="filter-row" id="cat-row">
        <span class="filter-label">领域</span>
      </div>
    </section>

    <section class="wrap">
      <div class="results-head">
        <h2 id="results-title"></h2>
        <select class="sort-select" id="sort" aria-label="排序">
          <option value="smart">智能排序</option>
          <option value="stars">Star 数</option>
          <option value="recent">最近更新</option>
          <option value="name">名称</option>
        </select>
      </div>
      <div class="grid" id="grid"></div>
    </section>
  </main>

  <footer>
    <div class="wrap foot-inner">
      <div class="foot-brand">${ICONS.triangle} skill233</div>
      <div class="foot-note">数据采集自 GitHub · 生成于 ${esc(metaData.generatedAt.slice(0, 10))} · 无后端纯前端</div>
      <div><a href="https://github.com/neko233-com" target="_blank" rel="noopener">neko233-com</a> · <a href="https://skill.neko233.com" target="_blank" rel="noopener">skill.neko233.com</a></div>
    </div>
  </footer>

  <div class="overlay" id="overlay">
    <aside class="drawer" id="drawer"></aside>
  </div>
  <div class="toast" id="toast">已复制</div>
`;

/* ----------------------------- filter chips ----------------------------- */
const sourceChips: { id: string; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'featured', label: '精选' },
  { id: 'mine', label: '我的' },
  { id: 'curated', label: '业内' },
];
const sourceRow = document.getElementById('source-row')!;
for (const s of sourceChips) {
  const b = document.createElement('button');
  b.className = 'chip' + (s.id === state.source ? ' active' : '');
  b.dataset.source = s.id;
  b.textContent = s.label;
  sourceRow.appendChild(b);
}

const catRow = document.getElementById('cat-row')!;
function renderCatChips() {
  catRow.querySelectorAll('.chip').forEach((el) => el.remove());
  const add = (id: string, label: string, icon: string, cnt: number) => {
    const b = document.createElement('button');
    b.className = 'chip' + (id === state.category ? ' active' : '');
    b.dataset.cat = id;
    b.innerHTML = `<span class="ico">${icon}</span>${esc(label)}<span class="cnt">${cnt}</span>`;
    catRow.appendChild(b);
  };
  add('all', '全部领域', '⊞', skills.length);
  for (const c of categories) {
    add(c.id, c.label, c.icon, metaData.counts[c.id] || 0);
  }
}
renderCatChips();

/* ----------------------------- render grid ----------------------------- */
const grid = document.getElementById('grid')!;
const resultsTitle = document.getElementById('results-title')!;
const searchMeta = document.getElementById('search-meta')!;
const searchbox = document.getElementById('searchbox')!;
const qEl = document.getElementById('q') as HTMLInputElement;

function currentResults(): Skill[] {
  const list = engine.search(state.query, state.category, state.source);
  const sorted = [...list];
  if (state.sort === 'stars') sorted.sort((a, b) => b.stars - a.stars);
  else if (state.sort === 'recent') sorted.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  else if (state.sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

function cardHTML(s: Skill): string {
  const cat = catById.get(s.category);
  return `
    <a class="card" href="${esc(s.url)}" target="_blank" rel="noopener" data-id="${esc(s.id)}"
       title="${esc(s.descriptionZh || s.description)}">
      <div class="card-top">
        <div class="card-ico">${cat?.icon || '📦'}</div>
        <div class="card-title">
          <div class="card-name">${esc(s.name)}<span class="ext">${ICONS.external}</span></div>
          <div class="card-owner">${esc(s.fullName)}</div>
        </div>
      </div>
      <div class="card-desc">${esc(s.descriptionZh || s.description || '—')}</div>
      <div class="card-tags">${s.tags.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="card-foot">
        <span class="star">${ICONS.star} ${fmtStars(s.stars)}</span>
        ${s.language ? `<span class="lang"><span class="lang-dot" style="background:${langColor(s.language)}"></span>${esc(s.language)}</span>` : ''}
        <span class="badge-src ${s.source}">${s.source === 'mine' ? 'MINE' : 'CURATED'}</span>
      </div>
    </a>`;
}

function render() {
  const list = currentResults();
  grid.innerHTML = list.length ? list.map(cardHTML).join('') : `
    <div class="empty" style="grid-column:1/-1">
      <div class="e-ico">∅</div>
      <h3>没有匹配的 Skill</h3>
      <p>换个关键词，或清除筛选条件试试。</p>
    </div>`;

  const srcLabel = sourceChips.find((s) => s.id === state.source)?.label || '';
  const catLabel = state.category === 'all' ? '全部领域' : catById.get(state.category)?.label || '';
  resultsTitle.innerHTML = `${srcLabel} · ${catLabel} — <b>${list.length}</b> 个结果`;
  searchMeta.innerHTML = state.query.trim()
    ? `检索 “<b>${esc(state.query.trim())}</b>” · 命中 <b>${list.length}</b> 项 · 毫秒级`
    : `共 <b>${metaData.total}</b> 个 Skill（我的 ${metaData.mine} · 业内 ${metaData.curated}）· 点击卡片直达 GitHub`;
  renderCatChips();
}

/* ----------------------------- events ----------------------------- */
sourceRow.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-source]');
  if (!btn) return;
  state.source = btn.dataset.source!;
  sourceRow.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === btn));
  render();
});

catRow.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-cat]');
  if (!btn) return;
  state.category = btn.dataset.cat!;
  render();
});

let debounce: number | undefined;
qEl.addEventListener('input', () => {
  state.query = qEl.value;
  searchbox.classList.toggle('has-value', !!qEl.value);
  window.clearTimeout(debounce);
  debounce = window.setTimeout(render, 60);
});

document.getElementById('clear')!.addEventListener('click', () => {
  qEl.value = '';
  state.query = '';
  searchbox.classList.remove('has-value');
  render();
  qEl.focus();
});

(document.getElementById('sort') as HTMLSelectElement).addEventListener('change', (e) => {
  state.sort = (e.target as HTMLSelectElement).value;
  render();
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    qEl.focus();
    qEl.select();
  }
  if (e.key === 'Escape') {
    if (overlay.classList.contains('open')) closeDrawer();
    else if (document.activeElement === qEl) { qEl.blur(); }
  }
});

/* ----------------------------- drawer ----------------------------- */
const overlay = document.getElementById('overlay')!;
const drawer = document.getElementById('drawer')!;
const toastEl = document.getElementById('toast')!;

function showToast(msg: string) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  window.setTimeout(() => toastEl.classList.remove('show'), 1500);
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }
  showToast('已复制到剪贴板');
}

function openDrawer(id: string) {
  const s = skills.find((x) => x.id === id);
  if (!s) return;
  const cat = catById.get(s.category);
  drawer.innerHTML = `
    <button class="drawer-close" id="dclose" aria-label="关闭">✕</button>
    <div class="d-head">
      <div class="d-ico">${cat?.icon || '📦'}</div>
      <div>
        <div class="d-name">${esc(s.name)}</div>
        <div class="d-full">${esc(s.fullName)}</div>
        <div class="d-cat">${cat?.icon || '📦'} ${esc(cat?.label || '其他')} ${s.isSkill ? '· Skill' : ''}</div>
      </div>
    </div>
    <div class="d-stats">
      <div class="d-stat"><b>${fmtStars(s.stars)}</b><span>Stars</span></div>
      <div class="d-stat"><b>${esc(s.language || '—')}</b><span>语言</span></div>
      <div class="d-stat"><b>${s.source === 'mine' ? '我的' : '业内'}</b><span>来源</span></div>
    </div>
    <div class="d-section">
      <h4>简介</h4>
      <div class="d-desc">${esc(s.descriptionZh || s.description || '暂无描述')}</div>
      ${s.descriptionZh && s.description && s.description !== s.descriptionZh ? `<div class="d-desc" style="margin-top:10px;color:var(--fg-3);font-size:12.5px">${esc(s.description)}</div>` : ''}
    </div>
    ${s.tags.length ? `<div class="d-section"><h4>标签</h4><div class="d-tags">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div></div>` : ''}
    <div class="d-section">
      <h4>快速开始</h4>
      <div class="d-actions">
        <a class="btn primary" href="${esc(s.url)}" target="_blank" rel="noopener">${ICONS.external} 打开仓库</a>
        ${s.homepage ? `<a class="btn" href="${esc(s.homepage)}" target="_blank" rel="noopener">${ICONS.docs} 官网</a>` : ''}
      </div>
      <div class="copy-box">
        <code>${esc(s.install)}</code>
        <button id="copybtn" title="复制">${ICONS.copy}</button>
      </div>
    </div>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('dclose')!.addEventListener('click', closeDrawer);
  document.getElementById('copybtn')!.addEventListener('click', () => copy(s.install));
}

function closeDrawer() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDrawer(); });

// Card click opens drawer but keeps native "open in new tab" via modifier/middle click.
grid.addEventListener('click', (e) => {
  const card = (e.target as HTMLElement).closest<HTMLElement>('.card');
  if (!card) return;
  // Plain left click: open detail drawer; ctrl/cmd click keeps native new-tab behavior.
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  openDrawer(card.dataset.id!);
});

render();
