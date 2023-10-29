import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { apiPaths } from '../constants/api';
import { ApiHeroesStats, HeroItemsApi } from './models/api';
import { HeroesStats, HeroItems } from './models/heroes';
import {
  getParsedHeroes,
  getParsedHeroesAllInfo,
  getParsedHeroItems,
} from './helpers/parseHeroes';

@Injectable()
export class HeroesService {
  constructor(private readonly httpService: HttpService) {}

  async getHeroes(): Promise<HeroesStats[]> {
    const data = await this.httpService.axiosRef.get<ApiHeroesStats[]>(
      `${apiPaths.dota}/heroStats`,
    );
    return getParsedHeroes(data.data);
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
