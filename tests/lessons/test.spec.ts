import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

test('test', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Click Me!' }).click();

  await expect(page.locator('#status')).toContainText('Button Clicked Successfully!');

});
// test decribe
    // test('test', async ({ page }) => {
          // test. step

          //annoutation
          //test.skip
          //test.only

          