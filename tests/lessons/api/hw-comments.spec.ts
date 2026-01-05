import { expect, test } from '@playwright/test';
test.describe('API Homework - Comments', () => {
  test('POST create comment', { tag: ['@api'] }, async ({ request }) => {
    const name = '21';
    const email = 'Eliseo@gardner.biz';
    const body = 'laudantium enim quasi est quidem magnam voluptate ipsam ';
    const response = await request.post('/posts/1/comments', {
      data: {
        name: name,
        email: email,
        body: body,
      },
    });
    const bodyResponse = await response.json();
    console.log(bodyResponse);
    expect(response.status()).toBe(201);
    expect(bodyResponse.name).toBe(name);
  });
});
