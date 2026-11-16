import './styles.css';
import catalog from './data/catalog.json';
import index from './data/search-index.json';
import meta from './data/meta.json';
import { SearchEngine } from './search';
import type { Skill, Category, Group, Meta, SearchIndex } from './types';

const skills = catalog as Skill[];
const metaData = meta as Meta;
const categories = metaData.categories;
const groups = metaData.groups;
const engine = new SearchEngine(skills, index as SearchIndex);

const catById = new Map<string, Category>(categories.map((c) => [c.id, c]));
const groupById = new Map<string, Group>(groups.map((g) => [g.id, g]));
const domainByGroup = new Map<string, Category[]>();
for (const c of categories) {
  const arr = domainByGroup.get(c.group) || [];
  arr.push(c);
  domainByGroup.set(c.group, arr);
}

const state = {
  query: '',
  group: 'all',
  category: 'all',
  subGroup: 'all',
  source: 'all',
  sort: 'smart',
  collapsed: new Set<string>(),
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
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  swap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h13l-3-3M17 17H4l3 3"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
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
    Rust: '#dea584', Shell: '#89e051', Java: '#b07219', Kotlin: '#A97BFF',
    'C#': '#178600', Ruby: '#701516', HTML: '#e34c26', CSS: '#563d7c',
    Swift: '#F05138', Dart: '#00B4AB', Cpp: '#f34b7d', 'C++': '#f34b7d',
  };
  return map[lang] || '#666';
}

/* ----------------------------- render shell ----------------------------- */
const app = document.getElementById('app')!;
app.innerHTML = `
  <header class="top">
    <div class="top-inner">
      <button class="menu-btn" id="menu-btn" aria-label="打开领域导航">${ICONS.menu}</button>
      <a class="brand" href="#" aria-label="skill233 home">
        <span class="brand-mark">${ICONS.triangle}</span>
        <span>skill233</span>
        <span class="sep">/</span>
        <small>Skill · 软件工具超链接中心</small>
      </a>
      <div class="top-spacer"></div>
      <div class="top-stat"><b>${metaData.total}</b> 项 · <b>${groups.length}</b> 分组 · <b>${categories.length}</b> 领域</div>
      <a class="btn-ghost" href="https://github.com/neko233-com/skill233-all" target="_blank" rel="noopener">
        ${ICONS.github} GitHub
      </a>
    </div>
  </header>

  <div class="layout">
    <aside class="sidebar" id="sidebar"></aside>
    <div class="scrim" id="scrim"></div>
    <main class="main">
      <section class="hero">
        <div class="hero-badge"><span class="dot"></span> 纯静态 · 毫秒检索 · 分组浏览 · 每日更新</div>
        <h1>找到好用的 <span class="dim">Skill 与软件</span></h1>
        <p>收录 <b>自用技能</b>、<b>业内优质 Skill</b> 与 <b>${metaData.tools} 款好用软件</b>，每项附 <b>使用文档</b>与 <b>备选工具</b>，按 <b>分组 → 领域 → 子分组</b> 组织，<b>一键直达</b>。</p>
        <div class="searchbox" id="searchbox">
          <span class="s-icon">${ICONS.search}</span>
          <input id="q" type="text" placeholder="搜索技能、软件、平台、领域…  例如：Clash Verge / 法律 / 截图 / iOS / 密码" autocomplete="off" spellcheck="false" />
          <div class="kbd"><kbd>⌘</kbd><kbd>K</kbd></div>
          <button class="clear" id="clear" title="清除">✕</button>
        </div>
        <div class="search-meta" id="search-meta"></div>
      </section>

      <section class="browser">
        <div class="subrow-wrap" id="subrow-wrap">
          <div class="subrow" id="subrow"></div>
        </div>
        <div class="results-head">
          <h2 id="results-title"></h2>
          <select class="sort-select" id="sort" aria-label="排序">
            <option value="smart">智能排序</option>
            <option value="stars">Star 数</option>
            <option value="recent">最近更新</option>
            <option value="name">名称</option>
          </select>
        </div>
        <div id="grid-host"></div>
      </section>

      <footer>
        <div class="foot-inner">
          <div class="foot-brand">${ICONS.triangle} skill233</div>
          <div class="foot-note">GitHub 数据自动采集 · 软件工具人工精选 · 生成于 ${esc(metaData.generatedAt.slice(0, 10))} · 无后端纯前端</div>
          <div><a href="https://github.com/neko233-com" target="_blank" rel="noopener">neko233-com</a> · <a href="https://skill.neko233.com" target="_blank" rel="noopener">skill.neko233.com</a></div>
        </div>
      </footer>
    </main>
  </div>

  <div class="overlay" id="overlay">
    <aside class="drawer" id="drawer"></aside>
  </div>
  <div class="toast" id="toast">已复制</div>
`;

/* ----------------------------- sidebar ----------------------------- */
const sidebar = document.getElementById('sidebar')!;
const QUICK = [
  { id: 'all', label: '全部内容', icon: '⊞' },
  { id: 'featured', label: '精选', icon: '✦' },
  { id: 'tool', label: '软件工具', icon: '🧰' },
  { id: 'mine', label: '我的', icon: '◉' },
  { id: 'curated', label: '业内', icon: '◎' },
];
const PLAT_SHORT: Record<string, string> = {
  Windows: 'Win', macOS: 'Mac', Linux: 'Linux', iOS: 'iOS',
  Android: 'Android', Web: 'Web', Extension: '扩展',
};

function renderSidebar() {
  const quick = QUICK.map((q) => `
    <button class="side-quick ${state.source === q.id && state.group === 'all' && state.category === 'all' ? 'active' : ''}"
            data-source="${q.id}">
      <span class="sq-ico">${q.icon}</span><span class="sq-label">${q.label}</span>
      <span class="sq-cnt">${q.id === 'all' ? metaData.total : q.id === 'mine' ? metaData.mine : q.id === 'curated' ? metaData.curated : q.id === 'tool' ? metaData.tools : skills.filter((s) => s.featured).length}</span>
    </button>`).join('');

  const groupHTML = groups.map((g) => {
    const isGroupActive = state.group === g.id && state.category === 'all';
    const collapsed = state.collapsed.has(g.id);
    const domains = domainByGroup.get(g.id) || [];
    const items = domains.map((d) => `
      <button class="side-domain ${state.category === d.id ? 'active' : ''}" data-domain="${d.id}" title="${esc(d.label)}">
        <span class="sd-ico">${d.icon}</span><span class="sd-label">${esc(d.label)}</span>
        <span class="sd-cnt">${d.count}</span>
      </button>`).join('');
    return `
      <div class="side-group ${isGroupActive ? 'group-active' : ''}">
        <div class="sg-head">
          <button class="sg-main ${isGroupActive ? 'active' : ''}" data-group="${g.id}" title="${esc(g.desc)}">
            <span class="sg-ico">${g.icon}</span>
            <span class="sg-label">${esc(g.label)}</span>
            <span class="sg-cnt">${g.count}</span>
          </button>
          <button class="sg-toggle ${collapsed ? 'collapsed' : ''}" data-toggle="${g.id}" aria-label="折叠/展开">${ICONS.chevron}</button>
        </div>
        <div class="sg-items ${collapsed ? 'hidden' : ''}">${items}</div>
      </div>`;
  }).join('');

  sidebar.innerHTML = `
    <div class="side-section-label">浏览</div>
    <div class="side-quicks">${quick}</div>
    <div class="side-section-label side-section-gap">领域分组</div>
    <nav class="side-groups">${groupHTML}</nav>
    <div class="side-foot">${categories.length} 个领域 · ${Object.keys(metaData.subCounts).length} 个子分组</div>
  `;
}

/* ----------------------------- sub-group chips ----------------------------- */
const subrow = document.getElementById('subrow')!;
function renderSubRow() {
  const cat = state.category !== 'all' ? catById.get(state.category) : undefined;
  const grp = state.group !== 'all' ? groupById.get(state.group) : undefined;

  if (cat) {
    const chips = [{ id: 'all', label: '全部子分组', count: cat.count }, ...cat.subs.map((s) => ({ id: s.id, label: s.label, count: s.count }))];
    subrow.innerHTML = `<span class="sub-label">${cat.icon} ${esc(cat.label)}</span>` + chips.map((s) => `
      <button class="sub-chip ${state.subGroup === s.id ? 'active' : ''}" data-sub="${s.id}">
        ${esc(s.label)}<span class="sc-cnt">${s.count}</span>
      </button>`).join('');
  } else if (grp) {
    const domains = domainByGroup.get(grp.id) || [];
    subrow.innerHTML = `<span class="sub-label">${grp.icon} ${esc(grp.label)}</span>` +
      domains.map((d) => `<button class="sub-chip" data-domain="${d.id}">${d.icon} ${esc(d.label)}<span class="sc-cnt">${d.count}</span></button>`).join('');
  } else {
    subrow.innerHTML = `<span class="sub-label">按分组浏览</span>` + groups.map((g) => `
      <button class="sub-chip" data-group="${g.id}">${g.icon} ${esc(g.label)}<span class="sc-cnt">${g.count}</span></button>`).join('');
  }
}

/* ----------------------------- cards ----------------------------- */
function subLabel(s: Skill): string {
  const d = catById.get(s.category);
  return d?.subs.find((x) => x.id === s.subGroup)?.label || '';
}

function cardHTML(s: Skill): string {
  const cat = catById.get(s.category);
  const isTool = s.source === 'tool';
  const plats = s.platforms || [];
  const srcBadge = isTool ? 'TOOL' : s.source === 'mine' ? 'MINE' : 'CURATED';
  return `
    <a class="card ${isTool ? 'card-tool' : ''}" href="${esc(s.url)}" target="_blank" rel="noopener" data-id="${esc(s.id)}"
       title="${esc(s.descriptionZh || s.description)}">
      <div class="card-top">
        <div class="card-ico">${cat?.icon || '📦'}</div>
        <div class="card-title">
          <div class="card-name">${esc(s.name)}<span class="ext">${ICONS.external}</span></div>
          <div class="card-owner">${isTool ? esc(plats.map((p) => PLAT_SHORT[p] || p).join(' · ')) : esc(s.fullName)}</div>
        </div>
      </div>
      <div class="card-desc">${esc(s.descriptionZh || s.description || '—')}</div>
      <div class="card-tags">
        <span class="tag tag-domain">${cat?.icon || ''} ${esc(cat?.label || '')}</span>
        <span class="tag">${esc(subLabel(s))}</span>
        ${isTool
          ? `${plats.slice(0, 3).map((p) => `<span class="tag tag-plat">${esc(p)}</span>`).join('')}<span class="tag tag-lic">${esc(s.license || '')}</span>`
          : s.tags.slice(0, 2).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
        ${s.docs ? `<span class="tag tag-docs" data-docs="${esc(s.docs)}" title="查看使用文档 / 教程">${ICONS.book} 文档</span>` : ''}
      </div>
      <div class="card-foot">
        ${isTool
          ? `<span class="plat-line">${esc(plats.slice(0, 4).map((p) => PLAT_SHORT[p] || p).join(' / '))}${plats.length > 4 ? ' …' : ''}</span>`
          : `<span class="star">${ICONS.star} ${fmtStars(s.stars)}</span>
             ${s.language ? `<span class="lang"><span class="lang-dot" style="background:${langColor(s.language)}"></span>${esc(s.language)}</span>` : ''}`}
        ${s.alts && s.alts.length ? `<span class="alt-count" title="${s.alts.length} 个备选工具">${ICONS.swap} ${s.alts.length}</span>` : ''}
        <span class="badge-src ${s.source}">${srcBadge}</span>
      </div>
    </a>`;
}

function currentResults(): Skill[] {
  const list = engine.search(state.query, {
    group: state.group, category: state.category, subGroup: state.subGroup, source: state.source,
  });
  const sorted = [...list];
  if (state.sort === 'stars') sorted.sort((a, b) => b.stars - a.stars);
  else if (state.sort === 'recent') sorted.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  else if (state.sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

const gridHost = document.getElementById('grid-host')!;
const resultsTitle = document.getElementById('results-title')!;
const searchMeta = document.getElementById('search-meta')!;
const searchbox = document.getElementById('searchbox')!;
const qEl = document.getElementById('q') as HTMLInputElement;

const HOME_LIMIT = 9;

function renderHome(list: Skill[]) {
  // Grouped sections for the default, unfiltered browse experience.
  const byDomain = new Map<string, Skill[]>();
  for (const s of list) {
    const arr = byDomain.get(s.category) || [];
    arr.push(s);
    byDomain.set(s.category, arr);
  }
  const ordered = categories.filter((c) => byDomain.has(c.id));
  const sections = ordered.map((c) => {
    const items = byDomain.get(c.id)!;
    const shown = items.slice(0, HOME_LIMIT);
    return `
      <section class="domain-section" id="domain-${c.id}">
        <div class="ds-head">
          <div class="ds-title"><span class="ds-ico">${c.icon}</span><h3>${esc(c.label)}</h3><span class="ds-cnt">${items.length}</span></div>
          <button class="ds-more" data-domain="${c.id}">查看全部 ${items.length} 个 ${ICONS.chevron}</button>
        </div>
        <div class="grid">${shown.map(cardHTML).join('')}</div>
      </section>`;
  }).join('');
  gridHost.innerHTML = sections || `<div class="empty"><div class="e-ico">∅</div><h3>暂无内容</h3></div>`;
}

function render() {
  const list = currentResults();
  const isHome = !state.query && state.category === 'all' && state.group === 'all' && state.source === 'all';

  if (isHome) renderHome(list);
  else gridHost.innerHTML = `<div class="grid">${list.length ? list.map(cardHTML).join('') : `
    <div class="empty" style="grid-column:1/-1">
      <div class="e-ico">∅</div>
      <h3>没有匹配的内容</h3>
      <p>换个关键词，或清除左侧筛选条件试试。</p>
    </div>`}</div>`;

  const cat = state.category !== 'all' ? catById.get(state.category) : undefined;
  const grp = state.group !== 'all' ? groupById.get(state.group) : undefined;
  const sub = cat?.subs.find((s) => s.id === state.subGroup);
  const srcLabel = QUICK.find((q) => q.id === state.source)?.label || '';
  let label = '';
  if (cat) label = `${cat.icon} ${esc(cat.label)}${sub ? ` / ${esc(sub.label)}` : ''}`;
  else if (grp) label = `${grp.icon} ${esc(grp.label)} · 全部领域`;
  else label = '全部内容';
  resultsTitle.innerHTML = `${label} <span class="rt-sep">·</span> <b>${list.length}</b> 个结果`;

  searchMeta.innerHTML = state.query.trim()
    ? `检索 “<b>${esc(state.query.trim())}</b>” · 命中 <b>${list.length}</b> 项 · 毫秒级`
    : `共 <b>${metaData.total}</b> 项（<b>${metaData.tools}</b> 款软件工具）· <b>${groups.length}</b> 个分组 · <b>${categories.length}</b> 个领域 · 点击卡片直达`;

  renderSidebar();
  renderSubRow();
  syncHash();
}

/* ----------------------------- deep links ----------------------------- */
function stateToHash(): string {
  if (state.category !== 'all') {
    return `#/domain/${state.category}${state.subGroup !== 'all' ? `/sub/${state.subGroup}` : ''}`;
  }
  if (state.group !== 'all') return `#/group/${state.group}`;
  if (state.source !== 'all') return `#/source/${state.source}`;
  return '#/all';
}

function syncHash() {
  const h = stateToHash();
  if (location.hash !== h) history.replaceState(null, '', h);
}

function applyHash() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  state.group = 'all'; state.category = 'all'; state.subGroup = 'all'; state.source = 'all';
  if (parts[0] === 'domain' && catById.has(parts[1])) {
    const d = catById.get(parts[1])!;
    state.category = d.id; state.group = d.group;
    if (parts[2] === 'sub' && d.subs.some((s) => s.id === parts[3])) state.subGroup = parts[3];
  } else if (parts[0] === 'group' && groupById.has(parts[1])) {
    state.group = parts[1];
  } else if (parts[0] === 'source' && QUICK.some((q) => q.id === parts[1])) {
    state.source = parts[1];
  }
  closeMobileNav();
  render();
}
window.addEventListener('hashchange', applyHash);

/* ----------------------------- events ----------------------------- */
function selectDomain(id: string) {
  const d = catById.get(id);
  if (!d) return;
  state.category = d.id;
  state.group = d.group;
  state.subGroup = 'all';
  closeMobileNav();
  render();
}
function selectGroup(id: string) {
  if (!groupById.has(id)) return;
  state.group = id;
  state.category = 'all';
  state.subGroup = 'all';
  state.collapsed.delete(id);
  closeMobileNav();
  render();
}

sidebar.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const toggle = t.closest<HTMLElement>('[data-toggle]');
  if (toggle) {
    const id = toggle.dataset.toggle!;
    if (state.collapsed.has(id)) state.collapsed.delete(id); else state.collapsed.add(id);
    renderSidebar();
    return;
  }
  const domain = t.closest<HTMLElement>('[data-domain]');
  if (domain) { selectDomain(domain.dataset.domain!); return; }
  const group = t.closest<HTMLElement>('[data-group]');
  if (group) { selectGroup(group.dataset.group!); return; }
  const src = t.closest<HTMLElement>('[data-source]');
  if (src) {
    state.source = src.dataset.source!;
    state.group = 'all'; state.category = 'all'; state.subGroup = 'all';
    render();
  }
});

subrow.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const sub = t.closest<HTMLElement>('[data-sub]');
  if (sub) { state.subGroup = sub.dataset.sub!; render(); return; }
  const domain = t.closest<HTMLElement>('[data-domain]');
  if (domain) { selectDomain(domain.dataset.domain!); return; }
  const group = t.closest<HTMLElement>('[data-group]');
  if (group) { selectGroup(group.dataset.group!); }
});

gridHost.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const more = t.closest<HTMLElement>('[data-domain]');
  if (more) { selectDomain(more.dataset.domain!); return; }
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
    e.preventDefault(); qEl.focus(); qEl.select();
  }
  if (e.key === 'Escape') {
    if (overlay.classList.contains('open')) closeDrawer();
    else if (document.body.classList.contains('nav-open')) closeMobileNav();
    else if (document.activeElement === qEl) qEl.blur();
  }
});

/* ----------------------------- mobile nav ----------------------------- */
const menuBtn = document.getElementById('menu-btn')!;
const scrim = document.getElementById('scrim')!;
function openMobileNav() { document.body.classList.add('nav-open'); }
function closeMobileNav() { document.body.classList.remove('nav-open'); }
menuBtn.addEventListener('click', () => {
  document.body.classList.contains('nav-open') ? closeMobileNav() : openMobileNav();
});
scrim.addEventListener('click', closeMobileNav);

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
  const grp = groupById.get(s.group);
  const sub = cat?.subs.find((x) => x.id === s.subGroup);
  const isTool = s.source === 'tool';
  const plats = s.platforms || [];
  const repoUrl = s.hasRepo && !s.url.includes('github.com') ? `https://github.com/${s.fullName}` : '';
  drawer.innerHTML = `
    <button class="drawer-close" id="dclose" aria-label="关闭">✕</button>
    <div class="d-head">
      <div class="d-ico">${cat?.icon || '📦'}</div>
      <div>
        <div class="d-name">${esc(s.name)}</div>
        <div class="d-full">${esc(isTool ? '官方网站 / 下载地址' : s.fullName)}</div>
        <div class="d-cat">${grp?.icon || ''} ${esc(grp?.label || '')} / ${cat?.icon || ''} ${esc(cat?.label || '')} / ${esc(sub?.label || '综合')}</div>
      </div>
    </div>
    <div class="d-stats">
      ${isTool ? `
        <div class="d-stat"><b>${esc(plats.slice(0, 3).map((p) => PLAT_SHORT[p] || p).join(' / ') || '—')}</b><span>支持平台</span></div>
        <div class="d-stat"><b>${esc(s.license || '—')}</b><span>授权</span></div>
        <div class="d-stat"><b>${s.hasRepo ? '有源码' : '官网'}</b><span>类型</span></div>
      ` : `
        <div class="d-stat"><b>${fmtStars(s.stars)}</b><span>Stars</span></div>
        <div class="d-stat"><b>${esc(s.language || '—')}</b><span>语言</span></div>
        <div class="d-stat"><b>${s.source === 'mine' ? '我的' : '业内'}</b><span>来源</span></div>
      `}
    </div>
    <div class="d-section">
      <h4>简介</h4>
      <div class="d-desc">${esc(s.descriptionZh || s.description || '暂无描述')}</div>
      ${s.descriptionZh && s.description && s.description !== s.descriptionZh ? `<div class="d-desc" style="margin-top:10px;color:var(--fg-3);font-size:12.5px">${esc(s.description)}</div>` : ''}
    </div>
    ${s.tags.length ? `<div class="d-section"><h4>标签</h4><div class="d-tags">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div></div>` : ''}
    ${s.docs ? `<div class="d-section">
      <h4>${ICONS.book} 使用文档 / 教程</h4>
      <a class="doc-callout" href="${esc(s.docs)}" target="_blank" rel="noopener">
        <span class="dc-ico">${ICONS.book}</span>
        <span class="dc-body"><b>去这里看文档</b><small>${esc(s.docs)}</small></span>
        <span class="dc-go">${ICONS.external}</span>
      </a>
      <div class="doc-hint">${isTool ? '新手建议先看文档中的「快速开始 / 安装配置」章节，再回到这里下载。' : '仓库 README 含安装、用法与示例，是从零上手的第一站。'}</div>
    </div>` : ''}
    <div class="d-section">
      <h4>${isTool ? '获取方式' : '快速开始'}</h4>
      <div class="d-actions">
        <a class="btn primary" href="${esc(s.url)}" target="_blank" rel="noopener">${ICONS.external} ${isTool ? '打开官网 / 下载' : '打开仓库'}</a>
        ${isTool
          ? (repoUrl ? `<a class="btn" href="${esc(repoUrl)}" target="_blank" rel="noopener">${ICONS.github} 源码</a>` : '')
          : (s.homepage ? `<a class="btn" href="${esc(s.homepage)}" target="_blank" rel="noopener">${ICONS.docs} 官网</a>` : '')}
      </div>
      <div class="copy-box">
        <code>${esc(isTool ? s.url : s.install)}</code>
        <button id="copybtn" title="复制">${ICONS.copy}</button>
      </div>
    </div>
    ${s.alts && s.alts.length ? `<div class="d-section">
      <h4>${ICONS.swap} 备选工具 · 同类可替换 (${s.alts.length})</h4>
      <div class="alt-list">
        ${s.alts.map((a) => `<button class="alt-item" data-alt="${esc(a.id)}"><span class="alt-ico">${ICONS.swap}</span><span>${esc(a.name)}</span><span class="alt-go">${ICONS.chevron}</span></button>`).join('')}
      </div>
      <div class="doc-hint">点击备选可查看它的文档、平台与下载方式，对比后选最适合自己的。</div>
    </div>` : ''}
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('dclose')!.addEventListener('click', closeDrawer);
  document.getElementById('copybtn')!.addEventListener('click', () => copy(isTool ? s.url : s.install));
  drawer.querySelectorAll<HTMLElement>('[data-alt]').forEach((el) => {
    el.addEventListener('click', () => openDrawer(el.dataset.alt!));
  });
}

function closeDrawer() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDrawer(); });

// Plain left click opens the detail drawer; modifier click keeps native new-tab behavior.
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  // "文档" quick-link inside a card: open docs, never the drawer.
  const docLink = t.closest<HTMLElement>('[data-docs]');
  if (docLink) {
    e.preventDefault();
    e.stopPropagation();
    window.open(docLink.dataset.docs!, '_blank', 'noopener');
    return;
  }
  const card = t.closest<HTMLElement>('.card');
  if (!card) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  openDrawer(card.dataset.id!);
});

applyHash();
