import { ApiHeroesStats, HeroItemsApi, HeroAbility, ApiHeroAbilities } from '../models/api';
import * as itemsData from '../constants/items.json';
import * as heroesData from '../constants/npc_heroes.json';
import * as heroesAbilities from '../constants/hero_abilities.json';
import * as abilitiesList from '../constants/abilities.json';
import {
  HeroesStats,
  HeroesAllStats,
  HeroItem,
  HeroItems,
  HeroItemsName,
  HeroesSettings,
  HeroComplexity,
  HeroAbilities
} from '../models/heroes';

export const getParsedHeroes = (herosList: ApiHeroesStats[]): HeroesStats[] => {
  return herosList.map((hero) => {
    const heroData = Object.values(heroesData).find(
      (item) => item.HeroID === hero.id.toString(),
    );
    return {
      id: hero.id,
      name: hero.name,
      localizedName: hero.localized_name,
      primaryAttr: hero.primary_attr,
      attackType: hero.attack_type,
      roles: hero.roles,
      img: hero.img,
      icon: hero.icon,
      heroId: hero.hero_id,
      complexity: Number(heroData['Complexity']),
      similarHeroes: heroData['SimilarHeroes'],
      range: hero.attack_range,
      moveSpeed: hero.move_speed,
    };
  });
};

export const getParsedHeroesAllInfo = (
  herosList: ApiHeroesStats[],
): HeroesAllStats[] => {
  return herosList.map((hero) => {
    const heroData = Object.values(heroesData).find(
      (item) => item.HeroID === hero.id.toString(),
    );

    const heroesAbilitiesKeys = Object.keys(heroesAbilities);
    const heroesAbilitiesKey = heroesAbilitiesKeys.find((key) => hero.name === key)
    const { abilities, talents } = heroesAbilities[heroesAbilitiesKey] as HeroAbility
    const listAbilities = abilities.map((name) => {
      const abilityKey = Object.keys(abilitiesList).find((key) => key === name)
      return abilitiesList[abilityKey]
    });

    const listTalents = talents.map((item) => {
      return {
        level: item.level,
        name: getParsedTalent(abilitiesList[item.name])
      }
    });

    return {
      abilities: getParsedHeroAbilities(listAbilities),
      talents: listTalents,
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
      complexity: Number(heroData['Complexity']),
      similarHeroes: heroData['SimilarHeroes'],
    };
  });
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

export const getHeroesSettings = (data: ApiHeroesStats[]): HeroesSettings => {
  const heroes = getParsedHeroesAllInfo(data);
  const roles = [];
  const range = new Set<number>();
  const moveSpeed = new Set<number>();

  heroes.forEach((hero) => {
    roles.push(...hero.roles)
    range.add(hero.attackRange)
    moveSpeed.add(hero.moveSpeed)
  })

  const heroesRoles = new Set(roles);
  const sortSettings = (a: number, b: number) => a - b;

  return {
    range: Array.from(range).sort(sortSettings),
    moveSpeed: Array.from(moveSpeed).sort(sortSettings),
    complexity: [HeroComplexity.SIMPLE, HeroComplexity.MIDDLE, HeroComplexity.HARD],
    roles: Array.from(heroesRoles),
  }
}


export const getParsedHeroAbilities = (apiAbilities: ApiHeroAbilities[]): HeroAbilities[] => {
  return apiAbilities.map(getParsedTalent)
};

export const getParsedTalent = (apiItem: ApiHeroAbilities): HeroAbilities => {
  return {
    dname: apiItem.dname,
    behavior: apiItem.behavior,
    dmgType: apiItem.dmg_type,
    bkbpierce: apiItem.bkbpierce,
    desc: apiItem.desc,
    attrib: apiItem.attrib,
    lore: apiItem.lore,
    img: apiItem.img
  }
};