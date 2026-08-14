import { test, expect } from '@playwright/test';
import { AutomationPage } from '../pages/AutomationPage';

// UC2 needs more vertical space because the Automation Anywhere
// Form Designer does not fit correctly in the default 1280x720 viewport.
test.use({
  viewport: {
    width: 1280,
    height: 1100,
  },
});

test.describe('UC2 - Form with Rules Builder', () => {

  test(
    'UC2 - Create Form',
    {
      tag: '@UC2',
    },
    async ({ page }) => {

      // Authentication + Form Designer loading can take time.
      test.setTimeout(180_000);

      const automationPage = new AutomationPage(page);

      // =====================================================
      // STEP 1 - OPEN APPLICATION
      // =====================================================

      await automationPage.openApplication();

      // =====================================================
      // STEP 2 - NAVIGATE TO AUTOMATION
      // =====================================================

      await automationPage.navigateToAutomation();

      // =====================================================
      // STEP 3 - OPEN CREATE MENU
      // =====================================================

      await automationPage.openCreateMenu();

      // =====================================================
      // STEP 4 - SELECT FORM
      // =====================================================

      await automationPage.selectForm();

      // =====================================================
      // STEP 5 - CREATE FORM
      // =====================================================

      await automationPage.createForm(
        'UC2 Automation Form',
        'Form created for Rules Builder automation'
      );

      // =====================================================
      // STEP 6 - ADD FIRST TEXT BOX
      // =====================================================

      await automationPage.addTextBox();

      // =====================================================
      // STEP 7 - ADD SECOND TEXT BOX
      // =====================================================

      await automationPage.addSecondTextBox();

      // =====================================================
      // STEP 8 - VERIFY FORM CANVAS
      // =====================================================

      await expect(
        page.locator('[data-path="content"]').first()
      ).toBeVisible({
        timeout: 15_000,
      });

    }
  );

});
