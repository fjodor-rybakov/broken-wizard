import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { HERO_WIZARD_ID } from './hero/hero.wizard';

@Update()
export class BotUpdate {
  @Start()
  async update(@Ctx() ctx: Scenes.SceneContext) {
    console.log('START');
    await ctx.scene.enter(HERO_WIZARD_ID);
  }
}
