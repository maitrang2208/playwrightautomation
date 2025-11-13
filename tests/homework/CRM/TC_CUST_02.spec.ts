import { test, expect, Page } from '@playwright/test';
import { format } from 'date-fns';
const URL = 'https://crm.anhtester.com/admin/authentication';
import { faker } from '@faker-js/faker';

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
  test('TC_CUST_02- tạo Customer (Nhập tất cả trường)', async ({ page }) => {
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    const companyContainer = page.locator('label', { hasText: 'Company' });
    const asterisk = companyContainer.locator('small', { hasText: '*' });
    await expect(asterisk).toBeVisible();
    const now = new Date();
    const parsedDate = format(now, 'HH:mm:ss');
    const companyName = `auto Company ${parsedDate}`;
    const vatNumber = faker.string.numeric(10);
    const phoneNumber = faker.phone.number();
    const websiteUrl = faker.internet.url();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();

    await page.locator('#company').fill(companyName); // input company
    //VAT
    await page.locator('#vat').fill(vatNumber);
    //PHONE
    await page.locator('#phonenumber').fill(phoneNumber);
    //WEBSITE
    await page.locator('#website').fill(websiteUrl);
    //ADDRESS
    await page.locator('#address').fill(address);
    //CITY
    await page.locator('#city').fill(city);
    //STATE
    await page.locator('#state').fill(state);
    //ZIP
    await page.locator('#zip').fill(zipCode);

    //currency
    const currencyField = page
      .locator('.form-group')
      .filter({ has: page.getByLabel('Currency') })
      .locator('button');
    await currencyField.click();
    await page.locator('.dropdown-menu').getByRole('option', { name: 'USD' }).click();

    //country
    await page.locator("button[data-id='country']").click();
    await page.locator('#country').selectOption('Vietnam');

    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
    const currencyValue = await currencyField.textContent();
    expect(currencyValue).toContain('USD');
    expect(await page.locator("button[data-id='country']").textContent()).toContain('Vietnam');
    expect(await page.locator('#vat').inputValue()).toContain(vatNumber);
    expect(await page.locator('#phonenumber').inputValue()).toContain(phoneNumber);
    expect(await page.locator('#website').inputValue()).toContain(websiteUrl);
    expect(await page.locator('#address').inputValue()).toContain(address);
    expect(await page.locator('#city').inputValue()).toContain(city);
    expect(await page.locator('#state').inputValue()).toContain(state);
    expect(await page.locator('#zip').inputValue()).toContain(zipCode);
    
    
  });
});
