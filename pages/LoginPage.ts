import { Page, expect } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator(
      'input[name="username"]'
    );

    this.passwordInput = page.locator(
      'input[name="password"]'
    );

    this.loginButton = page.locator(
      'button[name="submitLogin"]'
    );
  }

  async verifyLoginPage() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);

    await expect(this.usernameInput)
      .toHaveValue(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);

    await expect(this.passwordInput)
      .toHaveValue(password);
  }

  async verifyLoginButtonEnabled() {
    await expect(this.loginButton).toBeEnabled();
  }

  async clickLogin() {
    await expect(this.loginButton).toBeEnabled();

    await this.loginButton.click();
  }

  async login(
    username: string,
    password: string
  ) {
    await this.verifyLoginPage();

    await this.enterUsername(username);

    await this.enterPassword(password);

    await this.verifyLoginButtonEnabled();

    await this.clickLogin();
  }
}