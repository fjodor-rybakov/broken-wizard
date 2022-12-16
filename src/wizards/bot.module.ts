import { Module } from '@nestjs/common';
import { DragonWizard } from './dargon/dragon.wizard';
import { HeroWizard } from './hero/hero.wizard';
import { BotUpdate } from './bot.update';

@Module({
  providers: [BotUpdate, DragonWizard, HeroWizard],
})
export class BotModule {}
