// import { test,expect } from '@playwright/test';
// import{loginCases} from'../../test-data/login-cases.json';

// const testdata=JSON.parse(JSON.stringify(loginCases));

// const positive = testdata.filter(c => c.expectedResult === 'success');
// const negative = testdata.filter(c => c.expectedResult === 'error');
// for(const data of testdata){
//  test(`TC_LOGIN_01_${data.id}`, async ({ page }) => {
//     await page.goto('https://hrm.anhtester.com/erp/login');
//     const title = page.locator('h4');
//     await expect(title).toHaveText('Welcome to HRM | Anh Tester Demo');
//     await page.locator('#iusername').fill(data.username);
//     await page.locator('#ipassword').fill(data.password);
//     await page.getByRole('button', { name: 'Login' }).click();
//     await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
//     await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk');
//   });
// }
import { test, expect } from '@playwright/test';
import { loginCases } from '../../test-data/login-cases.json';

type LoginCase = {
  id: number;
  username: string;
  password: string;
  expectedResult?: 'success' | 'error';
  expectedMessage?: string;
  expectedUrl?: string;
};

const testdata = JSON.parse(JSON.stringify(loginCases)) as LoginCase[];

const positive = testdata.filter(c => c.expectedResult === 'success');
const negative = testdata.filter(c => c.expectedResult === 'error');

test.describe('Login - Positive', () => {
  for (const data of positive) {
    test(`TC_LOGIN_POS_${data.id}`, async ({ page }) => {
      await page.goto('https://hrm.anhtester.com/erp/login');
      await page.locator('#iusername').fill(data.username);
      await page.locator('#ipassword').fill(data.password);
      await page.getByRole('button', { name: 'Login' }).click();

      if (data.expectedMessage) {
        await expect(page.locator('.toast-message')).toHaveText(data.expectedMessage);
      }
      if (data.expectedUrl) {
        await expect(page).toHaveURL(data.expectedUrl);
      } else {
        await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk');
      }
    });
  }
});

test.describe('Login - Negative', () => {
  for (const data of negative) {
    test(`TC_LOGIN_NEG_${data.id}`, async ({ page }) => {
      await page.goto('https://hrm.anhtester.com/erp/login');
      await page.locator('#iusername').fill(data.username);
      await page.locator('#ipassword').fill(data.password);
      await page.getByRole('button', { name: 'Login' }).click();

      if (data.expectedMessage) {
        await expect(page.locator('.')).toHaveText(data.expectedMessage);
      }
      await expect(page).not.toHaveURL('https://hrm.anhtester.com/erp/desk');
    });
  }
});