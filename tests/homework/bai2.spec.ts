  import { test, expect } from '@playwright/test';
  test('test', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.getByRole('button', { name: 'Click Me!' }).click();
  await page.getByRole('button', { name: 'Nâng cao' }).click();
  await page.getByRole('checkbox', { name: 'Tôi đồng ý với các điều khoản' }).check();
  await expect(page.getByRole('button', { name: 'Tiếp tục' })).toBeEnabled();
  await expect(page.getByText('Đã xác thực.')).toBeVisible();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await expect(page.getByRole('heading', { name: 'Chào mừng bạn đã quay trở lại!' })).toBeVisible();
  })

  //bài làm tốt đã đáp ứng yêu cầu đề ra là có autowaiting và web first assertion 