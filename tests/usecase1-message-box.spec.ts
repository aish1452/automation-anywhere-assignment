import { test } from '@playwright/test';
import { AutomationPage } from '../pages/AutomationPage';

test.describe('UC1 - Create Task Bot with Message Box', () => {
  test.setTimeout(180000);

  test(
    'UC1 - Create Task Bot with Message Box',
    async ({ page }) => {
      const automationPage =
        new AutomationPage(page);

      const botName =
        'AA_MessageBox_Playwright_Test';

      const title =
        'Automation Anywhere Test';

      const message =
        'Hello from Playwright Automation!';

      // Open Automation Anywhere
      await automationPage.openApplication();

      // Automation
      await automationPage.navigateToAutomation();

      // Create
      await automationPage.openCreateMenu();

      // Task Bot
      await automationPage.selectTaskBot();

      // Create & edit
      await automationPage.createTaskBot(botName);

      // Search Message box
      await automationPage.searchForMessageBox();

      // Click OUTER Message box once
      await automationPage.openMessageBoxCategory();

      // Double-click INNER Message box
      await automationPage.addMessageBox();

      // Fill configuration
      await automationPage.configureMessageBox(
        title,
        message
      );

      // Save
      await automationPage.save();
    }
  );
});