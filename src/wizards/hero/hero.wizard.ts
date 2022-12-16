import { Wizard, WizardStep } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { DRAGON_WIZARD_ID } from '../dargon/dragon.wizard';

export const HERO_WIZARD_ID = 'HERO_WIZARD_ID';

@Wizard(HERO_WIZARD_ID)
export class HeroWizard {
  @WizardStep(0)
  async enter(ctx: Scenes.WizardContext) {
    console.log('ENTER HERO_WIZARD_ID STEP 0');
    ctx.wizard.selectStep(2);

    await ctx.scene.reenter();
  }

  // Ignore this step
  @WizardStep(1)
  async move(ctx: Scenes.WizardContext) {
    // console.log('ENTER HERO_WIZARD_ID STEP 1');
    await ctx.scene.enter(DRAGON_WIZARD_ID);
  }

  @WizardStep(2)
  async fight(ctx: Scenes.WizardContext) {
    console.log('ENTER HERO_WIZARD_ID STEP 2');
    await ctx.scene.enter(DRAGON_WIZARD_ID);
  }
}
