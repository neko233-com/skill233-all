import { tokenize } from './lib/tokenize.js';
import type { Skill, SearchIndex } from './types';

/**
 * Ultra-fast client-side search over a build-time inverted index.
 * No corpus tokenization at runtime — only the query is tokenized.
 * Postings are flat [id, weight, id, weight, ...] arrays.
 */
export class SearchEngine {
  private index: SearchIndex;
  private skills: Skill[];
  private tokenSet: Set<string>;
  private starRank: Float64Array;

  constructor(skills: Skill[], index: SearchIndex) {
    this.skills = skills;
    this.index = index;
    this.tokenSet = new Set(index.tokens);
    // Precompute a log-scaled star bonus so popular repos float up on ties.
    const max = skills.reduce((m, s) => Math.max(m, s.stars), 1) || 1;
    this.starRank = new Float64Array(skills.length);
    skills.forEach((s, i) => {
      this.starRank[i] = Math.log10(s.stars + 1) / Math.log10(max + 1);
    });
  }

  /**
   * @param query raw search string
   * @param category category id or 'all'
   * @param source 'all' | 'mine' | 'curated' | 'featured'
   */
  search(query: string, category = 'all', source = 'all'): Skill[] {
    const q = query.trim().toLowerCase();
    const scores = new Map<number, number>();

    if (q) {
      const terms = tokenize(q);
      const prefixes = new Set<string>();
      // Exact terms + prefix-expansion (only tokens >= 2 chars to avoid noise).
      for (const t of terms) {
        if (t.length >= 2) prefixes.add(t);
      }
      for (const t of prefixes) {
        for (const tok of this.tokenSet) {
          if (tok.startsWith(t) && tok.length <= 24) {
            for (let i = 0; i < this.index.postings[tok].length; i += 2) {
              const id = this.index.postings[tok][i];
              const w = this.index.postings[tok][i + 1] * 0.55; // prefix weaker
              scores.set(id, (scores.get(id) || 0) + w);
            }
          }
        }
      }
      for (const t of terms) {
        const posting = this.index.postings[t];
        if (!posting) continue;
        for (let i = 0; i < posting.length; i += 2) {
          const id = posting[i];
          const w = posting[i + 1];
          scores.set(id, (scores.get(id) || 0) + w);
        }
      }
      // Require every distinct term to appear somewhere (AND-ish) for multi-term queries.
      if (terms.length > 1) {
        const termHits = new Map<string, Set<number>>();
        for (const t of terms) {
          const hit = new Set<number>();
          const posting = this.index.postings[t];
          if (posting) for (let i = 0; i < posting.length; i += 2) hit.add(posting[i]);
          termHits.set(t, hit);
        }
        for (const [id] of [...scores]) {
          const all = [...termHits.values()].every((set) => set.has(id));
          if (!all) scores.delete(id);
        }
      }
    } else {
      // No query: score by popularity so the default grid is useful.
      this.skills.forEach((_, i) => scores.set(i, 0));
    }

    const results: { skill: Skill; score: number }[] = [];
    for (const [id, rawScore] of scores) {
      const s = this.skills[id];
      if (!s) continue;
      if (category !== 'all' && s.category !== category) continue;
      if (source === 'mine' && s.source !== 'mine') continue;
      if (source === 'curated' && s.source !== 'curated') continue;
      if (source === 'featured' && !s.featured) continue;
      const bonus = s.featured ? 2 : 0;
      const score = rawScore + bonus + this.starRank[id] * (q ? 1.5 : 10);
      results.push({ skill: s, score });
    }

    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.skill.stars - a.skill.stars;
    });
    return results.map((r) => r.skill);
  }
}
