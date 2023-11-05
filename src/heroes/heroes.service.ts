import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { apiPaths } from '../constants/api';
import { ApiHeroesStats, HeroItemsApi } from './models/api';
import { HeroesStats, HeroItems, Heroes } from './models/heroes';
import {
  getParsedHeroes,
  getParsedHeroesAllInfo,
  getParsedHeroItems,
  getHeroesSettings,
} from './helpers/parseHeroes';

@Injectable()
export class HeroesService {
  constructor(private readonly httpService: HttpService) { }

  async getHeroes(): Promise<Heroes> {
    const data = await this.httpService.axiosRef.get<ApiHeroesStats[]>(
      `${apiPaths.dota}/heroStats`,
    );
    return {
      settings: getHeroesSettings(data.data),
      heroes: getParsedHeroes(data.data)
    }
  }

  async getHero(id: number): Promise<HeroesStats> {
    const data = await this.httpService.axiosRef.get<ApiHeroesStats[]>(
      `${apiPaths.dota}/heroStats`,
    );
    const heroes = getParsedHeroesAllInfo(data.data);
    return heroes.find(({ heroId }) => heroId === id);
  }

  async getHeroItems(id: number): Promise<HeroItems> {
    const data = await this.httpService.axiosRef.get<HeroItemsApi>(
      `${apiPaths.dota}/heroes/${id}/itemPopularity`,
    );
    return getParsedHeroItems(data.data);
  }
}
