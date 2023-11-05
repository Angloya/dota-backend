import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) { }
  @Get('all')
  getHeroes() {
    return this.heroesService.getHeroes();
  }

  @Get(':id')
  async getHero(@Param() params: { id: string }) {
    const hero = await this.heroesService.getHero(Number(params.id));
    if (hero) {
      return hero;
    }
    throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
  }

  @Get('items/:id')
  async getHeroItems(@Param() params: { id: string }) {
    const items = await this.heroesService.getHeroItems(Number(params.id));
    if (items) {
      return items;
    }
    throw new HttpException('Items not found', HttpStatus.NOT_FOUND);
  }
}
