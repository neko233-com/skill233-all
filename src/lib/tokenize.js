/**
 * Shared tokenizer used by BOTH the build-time indexer and the runtime search.
 * Keeping a single implementation guarantees query tokens match indexed tokens.
 *
 * - Latin: lowercase alphanumeric runs (keeps + # . - inside tokens).
 * - CJK: emits unigrams + adjacent bigrams so Chinese substring queries match.
 */
export function tokenize(text) {
  const s = String(text ?? '').toLowerCase();
  const out = [];
  const push = (t) => { if (t) out.push(t); };

  // Latin / digit words — keep the full token AND its - _ . segments
  // so both "skill233-ruanzhu-writer" and "ruanzhu" are searchable.
  const latin = s.match(/[a-z0-9][a-z0-9+#.\-]*/g) || [];
  for (const w of latin) {
    push(w);
    const parts = w.split(/[-_.]+/).filter((p) => /[a-z0-9]/.test(p) && p.length >= 2);
    for (const p of parts) push(p);
  }

  // CJK runs -> unigram + bigram
  const cjkRuns = s.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g) || [];
  for (const run of cjkRuns) {
    for (let i = 0; i < run.length; i++) {
      push(run[i]);
      if (i + 1 < run.length) push(run.slice(i, i + 2));
    }
  }
  return out;
}

/** Field weights for scoring. Higher = stronger signal. */
export const FIELD_WEIGHTS = {
  name: 12,
  fullName: 8,
  tags: 6,
  category: 4,
  description: 3,
  topics: 2,
  owner: 1,
};
