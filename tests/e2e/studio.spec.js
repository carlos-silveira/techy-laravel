import { test, expect } from '@playwright/test';

test.describe('Studio CMS - Zero Babysitting Baseline', () => {
  test('User can load the Studio Dashboard and see its elements', async ({ page }) => {
    // 1. Visit the studio endpoint
    await page.goto('/studio');
    
    // Wait for the app to mount and the user interface to load
    await page.waitForLoadState('networkidle');

    // Verify basic routing and title (unauthenticated users go to login)
    await expect(page).toHaveTitle(/Studio Login | TechyNews/);
    
    // Verify that the login form is visible
    await expect(page.getByRole('button', { name: /Enter Studio/i })).toBeVisible();
    
  });
});
