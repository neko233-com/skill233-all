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
  category: string;
  source: 'mine' | 'curated';
  isSkill: boolean;
  featured: boolean;
  install: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Meta {
  generatedAt: string;
  total: number;
  mine: number;
  curated: number;
  categories: Category[];
  counts: Record<string, number>;
}

export interface SearchIndex {
  postings: Record<string, number[]>;
  tokens: string[];
}
