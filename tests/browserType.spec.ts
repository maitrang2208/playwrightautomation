import {test, chromium, webkit, firefox, BrowserType} from '@playwright/test';


test.describe('Browser Type Suite', () => {
  test('Chromium Browser Type', async ({browser}) => {
    // const browser = await chromium.launch(
    //     {slowMo: 2000, headless: false}
    // );
    // new context  = new incognito window
    const context = await browser.newContext();
    // new page = new tab
    const page = await context.newPage();
    await page.goto('https://anhtester.com/');
    console.log('Chromium Title:', await page.title());

    await browser.close();// đong cả trên manager
  })
})