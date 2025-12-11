import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
export class CRMLoginPage extends BasePage {
  //khai báo locator
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly h1Text = this.page.getByRole('heading', { level: 1 });

  async goto() {
    await this.page.goto('https://crm.anhtester.com/admin/authentication');
  }

  async expectOnPage(): Promise<void> {
    await expect(this.passwordInput).toBeVisible();
    await expect(this.h1Text).toContainText('Login');
    await expect(this.page).toHaveURL(/admin\/authentication/);
  }
  async login(email: string, password: string) {
    await this.fillWithLog(this.emailInput, email);
    await this.fillWithLog(this.passwordInput, password, {
      isSensitive: true,
      fillOptions: { timeout: 10000 },
    });
    await this.passwordInput.fill(password);
    await this.clickWithLog(this.loginButton, { timeout: 10000 });
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/admin/);
  }
}
