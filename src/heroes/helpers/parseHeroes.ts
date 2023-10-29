import { ApiHeroesStats, HeroItemsApi } from '../models/api';
import * as itemsData from '../constants/items.json';
import {
  HeroesStats,
  HeroesAllStats,
  HeroItem,
  HeroItems,
  HeroItemsName,
} from '../models/heroes';

export const getParsedHeroes = (herosList: ApiHeroesStats[]): HeroesStats[] => {
  return herosList.map((hero) => ({
    id: hero.id,
    name: hero.name,
    localizedName: hero.localized_name,
    primaryAttr: hero.primary_attr,
    attackType: hero.attack_type,
    roles: hero.roles,
    img: hero.img,
    icon: hero.icon,
    heroId: hero.hero_id,
  }));
};

export const getParsedHeroesAllInfo = (
  herosList: ApiHeroesStats[],
): HeroesAllStats[] => {
  return herosList.map((hero) => ({
    id: hero.id,
    name: hero.name,
    localizedName: hero.localized_name,
    primaryAttr: hero.primary_attr,
    attackType: hero.attack_type,
    roles: hero.roles,
    img: hero.img,
    icon: hero.icon,
    heroId: hero.hero_id,
    baseHealth: hero.base_health,
    baseHealthRegen: hero.base_health_regen,
    baseMana: hero.base_mana,
    baseManaRegen: hero.base_mana_regen,
    baseArmor: hero.base_armor,
    baseMr: hero.base_mr,
    baseAttackMin: hero.base_attack_min,
    baseAttackMax: hero.base_attack_max,
    baseStr: hero.base_str,
    baseAgi: hero.base_agi,
    baseInt: hero.base_int,
    strGain: hero.str_gain,
    agiGain: hero.agi_gain,
    intGain: hero.int_gain,
    attackRange: hero.attack_range,
    projectileSpeed: hero.projectile_speed,
    attackRate: hero.attack_rate,
    baseAttackTime: hero.base_attack_time,
    attackPoint: hero.attack_point,
    moveSpeed: hero.move_speed,
    turnRate: hero.turn_rate,
    cmEnabled: hero.cm_enabled,
    legs: hero.legs,
    dayVision: hero.day_vision,
    nightVision: hero.night_vision,
    turboPicks: hero.turbo_picks,
    turboWins: hero.turbo_wins,
  }));
};

export const getParsedHeroItems = (apiItems: HeroItemsApi): HeroItems => {
  const items = {} as HeroItems;
  const itemsList = Object.values(itemsData);

  for (const [key, value] of Object.entries(apiItems)) {
    items[HeroItemsName[key]] = Object.values(value).map((id) =>
      itemsList.find((item: HeroItem) => item.id === id),
    );
  }

  return items;
};
