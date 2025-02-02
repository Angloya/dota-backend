import { AbilitiesAttrib } from './api'

export interface HeroesStats {
  id: number;
  name: string;
  localizedName: string;
  primaryAttr: string;
  attackType: string;
  roles: string[];
  img: string;
  icon: string;
  heroId: number;
  complexity: HeroComplexity;
  similarHeroes: string[];
  range: number;
  moveSpeed: number;
}

export interface HeroItem {
  hint: string[];
  id: number;
  img: string;
  dname: string;
  qual: string;
  cost: number;
  notes: string;
  attrib: string[];
  mc: boolean;
  cd: number;
  lore: string;
  components: null | string[];
  created: boolean;
  charges: boolean;
}

export interface HeroItems {
  startGameItems: HeroItem;
  earlyGameItems: HeroItem;
  midGameItems: HeroItem;
  lateGameItems: HeroItem;
}

export enum HeroItemsName {
  'start_game_items' = 'startGameItems',
  'early_game_items' = 'earlyGameItems',
  'mid_game_items' = 'midGameItems',
  'late_game_items' = 'lateGameItems',
}

export enum HeroComplexity {
  SIMPLE = 1,
  MIDDLE = 2,
  HARD = 3
}

export interface HeroesSettings {
  range: number[];
  moveSpeed: number[];
  complexity: HeroComplexity[];
  roles: string[];
}

export interface Heroes {
  heroes: HeroesStats[];
  settings: HeroesSettings
}

export interface HeroAbilities {
  dname: string
  behavior: string
  dmgType: string
  bkbpierce: string
  desc: string
  attrib: AbilitiesAttrib[]
  lore: string
  img: string
}

export interface HeroTalent {
  level: number;
  name: HeroAbilities
}

export interface HeroesAllStats {
  abilities: HeroAbilities[];
  talents: HeroTalent[];
  id: number;
  name: string;
  localizedName: string;
  primaryAttr: string;
  attackType: string;
  roles: string[];
  img: string;
  icon: string;
  baseHealth: number;
  baseHealthRegen: number;
  baseMana: number;
  baseManaRegen: number;
  baseArmor: number;
  baseMr: number;
  baseAttackMin: number;
  baseAttackMax: number;
  baseStr: number;
  baseAgi: number;
  baseInt: number;
  strGain: number;
  agiGain: number;
  intGain: number;
  attackRange: number;
  projectileSpeed: number;
  attackRate: number;
  baseAttackTime: number;
  attackPoint: number;
  moveSpeed: number;
  turnRate: number;
  cmEnabled: boolean;
  legs: number;
  dayVision: number;
  nightVision: number;
  heroId: number;
  turboPicks: number;
  turboWins: number;
  complexity: HeroComplexity;
  similarHeroes: string[];
}