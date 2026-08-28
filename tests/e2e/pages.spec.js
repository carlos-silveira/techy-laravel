import { test, expect } from '@playwright/test';

test.describe('Static Pages', () => {
  const pages = [
    { url: '/about', title: /TechyNews/ },
    { url: '/archive', title: /TechyNews/ },
    { url: '/privacy', title: /Privacy/i },
    { url: '/terms', title: /Terms/i },
    { url: '/newsletter', title: /Newsletter/i },
  ];

  for (const p of pages) {
    test(`Page ${p.url} loads correctly`, async ({ page }) => {
      await page.goto(p.url);
      await expect(page).toHaveTitle(p.title);
      // Wait for network idle or main container
      await expect(page.locator('main').first()).toBeVisible();
    });
  }
});
