import { test } from '@playwright/test';
import { AutomationPage } from '../pages/AutomationPage';

test(
  'should navigate to Automation section',
  async ({ page }) => {

    const automationPage =
      new AutomationPage(page);

    await page.goto('/#/home');

    await automationPage.navigateToAutomation();
  }
);