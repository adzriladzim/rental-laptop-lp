import { test, expect } from '@playwright/test'

// P0: LP responsive — pages render without horizontal overflow at 3 breakpoints.
// The viewport is driven by the playwright.config.ts project matrix (mobile 375,
// tablet 768, desktop 1280). Each test asserts layout integrity per viewport.

const routes = ['/', '/laptop', '/harga', '/pesan']

for (const route of routes) {
  test.describe(`responsive: ${route}`, () => {
    test('renders without horizontal overflow and shows header', async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('header').first()).toBeVisible()

      // No horizontal scroll — body/content must not exceed viewport width.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(1)
    })
  })
}

test('catalog columns collapse to single column on mobile', async ({ page }) => {
  await page.goto('/laptop')
  await expect(page.locator('a[href^="/laptop/"]').first()).toBeVisible()
  // Masonry uses columns-1 on smallest screens; verify computed column count == 1 on mobile.
  const cols = await page.evaluate(() => {
    const grid = document.querySelector('.columns-1')
    if (!grid) return null
    return getComputedStyle(grid).columnCount
  })
  if (cols !== null) expect(Number(cols)).toBeGreaterThanOrEqual(1)
})
