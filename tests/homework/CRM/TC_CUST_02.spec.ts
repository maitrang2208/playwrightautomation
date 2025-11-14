import { test, expect, Page } from '@playwright/test';
import { format } from 'date-fns';
const URL = 'https://crm.anhtester.com/admin/authentication';
import { faker } from '@faker-js/faker';
import { te } from 'date-fns/locale';

function infomation() {
  return {
    vatNumber: faker.string.numeric(10),
    phoneNumber: faker.phone.number(),
    websiteUrl: faker.internet.url(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    currency: 'USD',
    country: 'Vietnam',
    companyName: `Auto Company ${format(new Date(), 'HH:mm:ss')}`,
 
  };
}
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
    const information = infomation();
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    const companyContainer = page.locator('label', { hasText: 'Company' });
    const asterisk = companyContainer.locator('small', { hasText: '*' });
    await expect(asterisk).toBeVisible();

    await page.locator('#company').fill(information.companyName); // input company
    //VAT
    await page.locator('#vat').fill(information.vatNumber);
    //PHONE
    await page.locator('#phonenumber').fill(information.phoneNumber);
    //WEBSITE
    await page.locator('#website').fill(information.websiteUrl);
    //ADDRESS
    await page.locator('#address').fill(information.address);
    //CITY
    await page.locator('#city').fill(information.city);
    //STATE
    await page.locator('#state').fill(information.state);
    //ZIP
    await page.locator('#zip').fill(information.zipCode);

    //currency
    const currencyField = page
      .locator('.form-group')
      .filter({ has: page.getByLabel('Currency') })
      .locator('button');
    await currencyField.click();
    await page.locator('.dropdown-menu').getByRole('option', { name: 'USD' }).click();

    //country
    await page.locator('#country').selectOption('Vietnam');

    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
    const currencyValue = await currencyField.textContent();
    expect(currencyValue).toContain('USD');
    expect(await page.locator("button[data-id='country']").textContent()).toContain('Vietnam');
    expect(await page.locator('#vat').inputValue()).toContain(information.vatNumber);
    expect(await page.locator('#phonenumber').inputValue()).toContain(information.phoneNumber);
    expect(await page.locator('#website').inputValue()).toContain(information.websiteUrl);
    expect(await page.locator('#address').inputValue()).toContain(information.address);
    expect(await page.locator('#city').inputValue()).toContain(information.city);
    expect(await page.locator('#state').inputValue()).toContain(information.state);
    expect(await page.locator('#zip').inputValue()).toContain(information.zipCode);
  });
});
test.describe('CRM customer - Kiểm thử chức năng UI', () => {
  test('TC_CUST_04- Kiểm tra "Same as Customer Info" (Billing)', async ({ page }) => {
    const information = infomation();
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    await test.step('1. Nhập tên công ty', async () => {
      const companyContainer = page.locator('label', { hasText: 'Company' });
      const asterisk = companyContainer.locator('small', { hasText: '*' });
      await expect(asterisk).toBeVisible();
      await page.locator('#company').fill(information.companyName); // input company
    });
    await test.step('2. Nhập các thông tin khác', async () => {
      //VAT
      await page.locator('#vat').fill(information.vatNumber);
      //PHONE
      await page.locator('#phonenumber').fill(information.phoneNumber);
      //WEBSITE
      await page.locator('#website').fill(information.websiteUrl);
      //ADDRESS
      await page.locator('#address').fill(information.address);
      //CITY
      await page.locator('#city').fill(information.city);
      //STATE
      await page.locator('#state').fill(information.state);
      //ZIP
      await page.locator('#zip').fill(information.zipCode);
      //currency
      const currencyField = page
        .locator('.form-group')
        .filter({ has: page.getByLabel('Currency') })
        .locator('button');
      await currencyField.click();
      await page.locator('.dropdown-menu').getByRole('option', { name: information.currency }).click();
      //country
      await page.locator('#country').selectOption(information.country);
    });
    await test.step('3. Click Save and verify', async () => {
      await page.getByRole('button', { name: 'Save', exact: true }).click();
      await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
      const currencyValue = await page
        .locator('.form-group')
        .filter({ has: page.getByLabel('Currency') })
        .locator('button')
        .textContent();
      expect(currencyValue).toContain('USD');
      expect(await page.locator("button[data-id='country']").textContent()).toContain('Vietnam');
      expect(await page.locator('#vat').inputValue()).toContain(information.vatNumber);
      expect(await page.locator('#phonenumber').inputValue()).toContain(information.phoneNumber);
      expect(await page.locator('#website').inputValue()).toContain(information.websiteUrl);
      expect(await page.locator('#address').inputValue()).toContain(information.address);
      expect(await page.locator('#city').inputValue()).toContain(information.city);
      expect(await page.locator('#state').inputValue()).toContain(information.state);
      expect(await page.locator('#zip').inputValue()).toContain(information.zipCode);
    });
    await test.step('4. Click tab "Billing & Shipping', async () => {
      await page.getByRole('tab', { name: 'Billing & Shipping' }).click();
      await page.getByRole('link', { name: 'Same as Customer Info' }).click();
    });
    await test.step('5. Verify thông tin Billing được copy đúng', async () => {
      await expect(page.locator('#billing_street')).toHaveValue(information.address);
      await expect(page.locator('#billing_city')).toHaveValue(information.city);
      await expect(page.locator('#billing_state')).toHaveValue(information.state);
      await expect(page.locator('#billing_zip')).toHaveValue(information.zipCode);
      expect(await page.locator("button[data-id='billing_country']").textContent()).toContain(information.country);
    });
  });
  test('TC_CUST_05- Kiểm tra "Same as Customer Info" (Billing)', async ({ page }) => {
    const information = infomation();
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    await test.step('1. Nhập tên công ty', async () => {
      const companyContainer = page.locator('label', { hasText: 'Company' });
      const asterisk = companyContainer.locator('small', { hasText: '*' });
      await expect(asterisk).toBeVisible();
      await page.locator('#company').fill(information.companyName); // input company
    });
    await test.step('3. Click Save and verify', async () => {
      await page.getByRole('button', { name: 'Save', exact: true }).click();
      await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
    });
    await test.step('4. Click tab "Billing & Shipping', async () => {
      await page.getByRole('tab', { name: 'Billing & Shipping' }).click();
      await page.getByRole('link', { name: 'Same as Customer Info' }).click();
    });
    await test.step('5. Nhập thông tin billing', async () => {
      await page.locator('#billing_street').fill(information.address);
      await page.locator('#billing_city').fill(information.city);
      await page.locator('#billing_state').fill(information.state);
      await page.locator('#billing_zip').fill(information.zipCode);
      await page.locator('#billing_country').selectOption(information.country);
    });
    await test.step('4. Click link "Copy Billing Address', async () => {
      await page.getByRole('link', { name: 'Copy Billing Address' }).click();
    });
    await test.step('5. Verify thông tin Shipping Address is copied from Billing ', async () => {
      await expect(page.locator('#shipping_street')).toHaveValue(information.address);
      await expect(page.locator('#shipping_city')).toHaveValue(information.city);
      await expect(page.locator('#shipping_state')).toHaveValue(information.state);
      await expect(page.locator('#shipping_zip')).toHaveValue(information.zipCode);
      expect(await page.locator("button[data-id='shipping_country']").textContent()).toContain(information.country);
    });
  });
});
test.describe('CRM customer - Negative case', () => {
  test('TC_CUST_06- Bỏ trống trường "Company"', async ({ page }) => {
    const information = infomation();
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    await test.step('1. Bỏ trống tên công ty', async () => {
      const companyContainer = page.locator('label', { hasText: 'Company' });
      const asterisk = companyContainer.locator('small', { hasText: '*' });
      await expect(asterisk).toBeVisible();
      await page.locator('#company').fill(''); // input company
    });
    await test.step('2. Click Save and Thông báo lỗi ', async () => {
      await page.getByRole('button', { name: 'Save', exact: true }).click();
      await expect(page.locator('#company-error')).toContainText('This field is required.');
 
    });

  });
  test('TC_CUST_07- Cảnh báo Company đã tồn tại', async ({ page }) => {
    const information = infomation();
    await loginCRMAndNavigateToCustomer(page, 'Customers');
    await test.step('1. Nhập tên công ty', async () => {
      const companyContainer = page.locator('label', { hasText: 'Company' });
      const asterisk = companyContainer.locator('small', { hasText: '*' });
      await expect(asterisk).toBeVisible();
      await page.locator('#company').fill(information.companyName); // input company
    });
    await test.step('3. Click Save and verify', async () => {
      await page.getByRole('button', { name: 'Save', exact: true }).click();
      await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
    });
    
    await test.step('4. Click add Quick create', async() => {
        await page.getByRole('listitem', { name: 'Quick Create' }).getByRole('link').click();
        await page.locator('[class*="dropdown-menu"]').filter({hasText:"Quick Create"}).getByRole('link',{name:'Customer'}).click();
    })
    await test.step('5. Nhập lại tên công ty đã tạo', async () => {
        await page.locator('#company').fill(information.companyName);
        await page.keyboard.press('Tab');
        await expect(page.locator('#company_exists_info')).toContainText(`It looks that a customer with name ${information.companyName} already exists, if you still want to create the customer you can ignore this message.`)
    })
  });
});