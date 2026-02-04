//import { test } from '@playwright/test';

import { test } from '../CRM/Fixture/base-fixture';
import { expect } from '@playwright/test';


//fixture
//AAA
//file test giống như 1 thằng nahcj trưởng.

test('CRM Login page- login thanh cong', async ({ page,dashboardPage,newCustomerPage ,loginPage }) => {
  //arrange: khởi tạo điều kiện cần thiết

  await loginPage.goto();
  
  await loginPage.expectOnPage();
  //actions: thực hiện actions
  await loginPage.login('admin@example.com', '123456');

  //assert
  await dashboardPage.expectOnPage();
  await newCustomerPage.clickSaveButton()
  
});