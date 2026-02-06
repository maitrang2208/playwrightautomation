import { test, expect } from '@playwright/test';
import { EnvManager } from '../CRM/utils/EnvManager';

test.describe('Login Page HRM - Positive case', () => {
  test('TC_LOGIN_01', async ({ page }) => {
    const url = EnvManager.get('BASE_URL');

    await page.goto(url);
    const title = page.locator('h4');
    await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill(EnvManager.get('USER_NAME'));
    await page.locator('#ipassword').fill(EnvManager.get('PASSWORD'));

    console.log(`ĐANG DÙNG USERNAME: ${EnvManager.get('USER_NAME')}`);
    console.log(`ĐANG DÙNG PASSWORD: ${EnvManager.get('PASSWORD')}`);

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
    await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk');
  });
  // test('TC_LOGIN_02', async ({ page }) => {
  //   await page.goto(URL);
  //   const title = page.locator('h4');
  //   await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
  //   await page.locator('#iusername').fill('admin_example');
  //   await page.locator('#ipassword').fill('123456');
  //   await page.locator('#ipassword').press('Enter');
  //   await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
  //   await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk');
  // });
});
