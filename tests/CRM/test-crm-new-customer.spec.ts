
import {test} from './Fixture/gatekeeper.fixture'
import { createMinimalCustomerInfo } from './utils/testdata';



test('TC_CUST_01- Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page,dashboardPage,customersPage, newCustomerPage}) => {

  await test.step('Verify dashboard da load sau khi login', async () => {
    await dashboardPage.expectOnPage();
  });

  await test.step('Navigate tu dashboardPage -> customer page', async () => {
    await dashboardPage.navigateMenu('Customers');
    await customersPage.expectOnPage();
    await page.waitForTimeout(1000);
  });
  await test.step('Navigate tu customerPage -> new Customer Page', async () => {
    await customersPage.clickAddNewCustomer();
    await newCustomerPage.expectOnPage();
  });
  const customerInfo = createMinimalCustomerInfo();
  await test.step('Fill required company field', async () => {
    await newCustomerPage.fillCompany(customerInfo.company);
    await newCustomerPage.clickSaveButton();

  });
});