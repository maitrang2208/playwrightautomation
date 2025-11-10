import { test, expect } from '@playwright/test';

const URL = 'https://hrm.anhtester.com/';

test.describe('Login Page HRM - Negative case', () => {
  test('TC_LOGIN_04-Sai Username', async ({ page }) => {
    await page.goto(URL);
    const title = page.locator('h4');
    await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill('user_khong_ton_tai');
    await page.locator('#ipassword').fill('1234567');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.');
  });
  test('TC_LOGIN_05-Bỏ trống cả hai trường', async ({ page }) => {
    await page.goto(URL);
    const title = page.locator('h4');
    await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill('');
    await page.locator('#ipassword').fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.toast-message')).toHaveText('The username field is required.');
  });
  test('TC_LOGIN_06-Bỏ trống Password', async ({ page }) => {
    await page.goto(URL);
    const title = page.locator('h4');
    await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill('admin_example');
    await page.locator('#ipassword').fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.toast-message')).toHaveText('The password field is required.');
  });
  test('TC_LOGIN_07-Bỏ trống Username', async ({ page }) => {
    await page.goto(URL);
    const title = page.locator('h4');
    await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill('');
    await page.locator('#ipassword').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.toast-message')).toHaveText('The username field is required.');
  });
});

test.describe('Login Page HRM - UI', () => {
  test('TC_LOGIN_12- Phân biệt Hoa/Thường', async ({ page }) => {
    await page.goto(URL);
    const title = page.locator('h4');
    await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
    await page.locator('#iusername').fill('ADMIN_EXAMPLE');
    await page.locator('#ipassword').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
    await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk');
  });
});
