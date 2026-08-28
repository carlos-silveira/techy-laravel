import { test, expect } from '@playwright/test';

test.describe('Article Pages', () => {
  test('Can read an article and view comments', async ({ page }) => {
    await page.goto('/');
    
    // Find first article link
    const firstArticle = page.locator('a[href^="/article/"]').first();
    const articleHref = await firstArticle.getAttribute('href');
    await firstArticle.click();

    // Verify URL
    await expect(page).toHaveURL(new RegExp(articleHref));

    // Verify Title
    await expect(page.locator('h1')).toBeVisible();

    // Verify Comments section is present
    await expect(page.locator('text=Comments')).toBeVisible();

    // Add a comment
    const commentInput = page.locator('textarea[placeholder="Add a comment..."]');
    await commentInput.fill('This is a test comment from Playwright!');
    await page.locator('button[type="submit"]').click();

    // Verify comment appears
    await expect(page.locator('text=This is a test comment from Playwright!')).toBeVisible();
  });
});
