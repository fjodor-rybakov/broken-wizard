import { Wizard, WizardStep } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';

export const DRAGON_WIZARD_ID = 'DRAGON_WIZARD_ID';

@Wizard(DRAGON_WIZARD_ID)
export class DragonWizard {
  @WizardStep(0)
  async enter(ctx: Scenes.WizardContext) {
    console.log('ENTER DRAGON_WIZARD_ID STEP 0');
    ctx.wizard.selectStep(1);

    await ctx.scene.reenter();
  }

  @WizardStep(1)
  async move(ctx: Scenes.WizardContext) {
    console.log('ENTER DRAGON_WIZARD_ID STEP 1');
  }
}
