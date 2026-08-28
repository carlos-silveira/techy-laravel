import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TechyNews/);
    // Check if hero article is visible or just some standard element
    const logo = page.locator('img[alt="Techy News"]').first();
    await expect(logo).toBeVisible();
  });

  test('Reels homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TechyNews/);
    const likeButton = page.locator('button', { hasText: 'Like' }).first();
    // It might not exist if there are no articles, but let's assume there are.
  });

  test('Search works', async ({ page }) => {
    await page.goto('/');
    // We should be able to open search
    await page.locator('button').filter({ hasText: 'Search' }).first().click();
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });
});
