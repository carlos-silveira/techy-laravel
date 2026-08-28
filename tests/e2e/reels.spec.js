import { test, expect } from '@playwright/test';

test.describe('Reels Demo', () => {
  test('Can open reels and interact', async ({ page }) => {
    await page.goto('/');
    
    // Check if title is clickable and takes to the article
    const firstTitle = page.locator('h1 a').first();
    const articleHref = await firstTitle.getAttribute('href');
    await expect(firstTitle).toBeVisible();
    
    // Add comment in reels
    await page.getByRole('button', { name: 'Comments' }).first().click();
    await expect(page.getByRole('heading', { name: /Comments/ })).toBeVisible();
    
    const commentInput = page.locator('textarea[placeholder="Add a comment..."]');
    await expect(commentInput).toBeVisible();
    await commentInput.fill('Test comment in reels from Playwright!');
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('text=Test comment in reels from Playwright!')).toBeVisible();
    
    // Close drawer
    await page.locator('button > svg.lucide-x').first().click();
    
    // Click title to go to article
    await firstTitle.click();
    await expect(page).toHaveURL(new RegExp(articleHref));
  });
});
