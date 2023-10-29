import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
