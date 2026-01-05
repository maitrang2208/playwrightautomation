import { test } from '@playwright/test';
// 👇 Khai báo testInfo ở đây
test('regression test',{tag:['@regression']}, async ({ page }, testInfo) => {
  testInfo.annotations.push({
    type: 'issue',
    description: 'https://jira.company.com/browse/BUG-123',
  });
  await page.goto('https://playwright.dev/docs/api/class-testinfo');
  console.log(testInfo.title); // In ra tên bài test
    const screenshot = await page.screenshot();
  
  // Đính kèm ảnh vào Report
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
});
test('smoke test',{tag:['@smoke']}, async ({ page }, testInfo) => {
  testInfo.annotations.push({
    type: 'issue',
    description: 'https://jira.company.com/browse/BUG-123',
  });
  await page.goto('https://playwright.dev/docs/api/class-testinfo');
  console.log(testInfo.title); // In ra tên bài test
    const screenshot = await page.screenshot();
  
  // Đính kèm ảnh vào Report
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
});
