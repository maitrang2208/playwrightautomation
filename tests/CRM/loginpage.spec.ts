import { test, expect, Page } from '@playwright/test';
  import {format} from 'date-fns';
const URL = 'https://crm.anhtester.com/admin/authentication';

async function loginCRMAndNavigateToCustomer(page: Page, tabName: String) {
  await page.goto(URL);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Login');
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/admin/);
  const customersMenu = page.locator('#side-menu').getByRole('link', { name: `${tabName}` });
  expect(customersMenu).toBeVisible();
  await customersMenu.click();
  await page.getByRole('link', { name: 'New Customer' }).click();
}
test.describe('CRM customer - Positive case', () => {
  test('TC_CUST_01-Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    const companyContainer = page.locator('label', { hasText: 'Company' });
    const asterisk = companyContainer.locator('small', { hasText: '*' });
    await expect(asterisk).toBeVisible();

    const now = new Date();
    const parsedDate = format(now,'HH:mm:ss')
    const companyName=`auto Company ${parsedDate}`

    await page.locator('#company').fill(companyName);
    await page.getByRole('button',{name:'Save',exact:true}).click();
    await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');

    const currentUrl = page.url();

    const urlParst = currentUrl.split('/clients/client/');

    console.log(urlParst);

    const customerId = urlParst[1];

    const customerNameDisplay = page.locator('span.tw-truncate');

    const displayedText = await customerNameDisplay.textContent();

    console.log(displayedText);

    expect(displayedText).toContain(customerId);
  });
});
