export interface Skill {
  id: string;
  name: string;
  owner: string;
  fullName: string;
  url: string;
  homepage: string;
  description: string;
  descriptionZh: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  tags: string[];
  /** domain id, e.g. 'game', 'legal', 'ai-agent' */
  category: string;
  /** top-level group id, e.g. 'game', 'pro', 'ai' */
  group: string;
  /** in-domain sub-group id, e.g. 'pixel', 'contract', 'framework' */
  subGroup: string;
  source: 'mine' | 'curated' | 'tool';
  isSkill: boolean;
  featured: boolean;
  install: string;
  updatedAt: string;
  /** Software-tool-only fields (source === 'tool'). */
  platforms?: string[];
  license?: string;
  hasRepo?: boolean;
}

export interface SubGroup {
  id: string;
  label: string;
  count: number;
}

/** A domain (领域), belonging to a group, containing sub-groups. */
export interface Category {
  id: string;
  label: string;
  icon: string;
  group: string;
  subs: SubGroup[];
  count: number;
}

/** A top-level group (分组) in the left vertical tab. */
export interface Group {
  id: string;
  label: string;
  icon: string;
  desc: string;
  count: number;
}

export interface Meta {
  generatedAt: string;
  total: number;
  mine: number;
  curated: number;
  tools: number;
  groups: Group[];
  categories: Category[];
  counts: Record<string, number>;
  subCounts: Record<string, number>;
  groupCounts: Record<string, number>;
}

export interface SearchIndex {
  postings: Record<string, number[]>;
  tokens: string[];
}
