import { test as base } from '@playwright/test';
import { BasePage, CRMCustomerPage, CRMDashboardPage, CRMLoginPage, CRMNewCustomerPage } from '../pom/index';

type MyFixtures = {
  loginPage: CRMLoginPage;
  dashboardPage: CRMDashboardPage;
  customersPage: CRMCustomerPage;
  newCustomerPage: CRMNewCustomerPage;
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new CRMLoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new CRMDashboardPage(page);
    await use(dashboardPage);
  },
    customersPage: async ({ page }, use) => {  
    const customersPage = new CRMCustomerPage(page);
    await use(customersPage);
  }         
});
   