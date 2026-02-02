  import { test, expect } from '@playwright/test';
  import { stat } from 'node:fs/promises';
  import {format} from 'date-fns';
  import path from 'path';
test('ví dụ về upload file', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.getByRole('tab', { name: 'Upload Files' }).click();

  const visible = page.locator('#visible-input');

  //PW tự động upload file cho chúng ta -> ok

  await visible.setInputFiles(path.join(__dirname, 'test.pdf'));

  //div[contains(text(), '1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span

  await expect(

    page

      .locator(

        "//div[contains(text(), '1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span"

      )

      .nth(1)

  ).toContainText('test.pdf');

  await page.pause();

});


test('ví dụ về download file', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.getByRole('tab', { name: 'Upload Files' }).click();

  // 1. Đợi event download

  //đợi cho tất cả các promise con ở trong array thực hiện thành công rồi lấy kết quả

  const [download] = await Promise.all([

    page.waitForEvent('download'),
    page.locator('#download-demo-btn').click(),
  ]);

  const fileName = download.suggestedFilename();

  console.log(fileName);

  // 2. Kiểm tra tên file (suggested)

  expect(download.suggestedFilename()).toBe('login-data.xlsx');

  await download.saveAs('downloads/login-data-verified.xlsx');

  const info = await stat('downloads/login-data-verified.xlsx');

  console.log(info.size);

  expect(info.size).toBeGreaterThan(100);

  await page.pause();

});

test('ví dụ về shadow DOM', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

 const openHost = page.locator('open-shadow-el#open-shadow-demo');
await openHost.locator('#os-input').fill('Hello Shadow');
await openHost.locator('#os-btn').click();
await expect(openHost.locator('#os-status')).toHaveText('You typed: Hello Shadow');
})

test('ví dụ về iframe', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();
  // Cách 1: Theo ID (dễ nhất)
  const frame = page.frameLocator('#demo-iframe');
  await frame.locator('#if-input').fill('Hello iFrame');
  await frame.locator('#if-btn').click();
  await expect(frame.locator('#if-status')).toHaveText('You typed: Hello iFrame');
});

test('datetime', async ({ page }) => {

const today = new Date();

  const formateDate = format(today, 'dd/MM/yyyy');
  console.log(formateDate);
  const formattedTime = format(today, 'HH:mm:ss');
  console.log(formattedTime);


  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  await page.getByRole('tab', { name: 'Upload Files' }).click();
  await page.getByText('jQuery Date Picker', { exact: true })
});