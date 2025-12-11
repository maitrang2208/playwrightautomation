//import { test } from '@playwright/test';
import { test } from '../CRM/Fixture/base-fixture';
import { expect } from '@playwright/test';
import { CRMLoginPage } from './pom/CRMLoginPage';
import { CRMDashboardPage } from './pom/CRMDashboardPage';

//fixture
//AAA
//file test giống như 1 thằng nahcj trưởng.

test('CRM Login page- login thanh cong', async ({ page,dashboardPage,newCustomerPage  }) => {
  //arrange: khởi tạo điều kiện cần thiết
  const loginPage = new CRMLoginPage(page);

  await loginPage.goto();

  await loginPage.expectOnPage();
  //actions: thực hiện actions
  await loginPage.login('admin@example.com', '123456');

  //assert
  await dashboardPage.expectOnPage();
});