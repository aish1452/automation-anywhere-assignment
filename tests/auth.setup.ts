import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';

dotenv.config();

const authFile = 'auth/user.json';

setup(
  'authenticate Automation Anywhere user',
  async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('/#/login');

    await loginPage.login(
      process.env.AA_EMAIL!,
      process.env.AA_PASSWORD!
    );

    await expect(page).toHaveURL(
      /#\/home/
    );

    await page.context().storageState({
      path: authFile,
    });
  }
);