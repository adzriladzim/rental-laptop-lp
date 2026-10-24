import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// P0: LP a11y — axe scan, keyboard navigation, focus visibility.
test.describe('Accessibility', () => {
  test('homepage has no critical axe violations', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('calendar day buttons are keyboard reachable and operable', async ({ page }) => {
    await page.goto('/pesan')
    await page.getByRole('button', { name: 'Lanjut' }).first().waitFor()

    // Tab to the first enabled future day and activate with Enter.
    const firstDay = page.locator('button[aria-label]').first()
    await firstDay.focus()
    await page.keyboard.press('Enter')
    await expect(firstDay).toHaveAttribute('aria-pressed', 'true')
  })

  test('month nav buttons have accessible names', async ({ page }) => {
    await page.goto('/pesan')
    await expect(page.getByRole('button', { name: 'Bulan berikutnya' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Bulan sebelumnya' })).toBeVisible()
  })

  test('error messages are announced via role=alert', async ({ page }) => {
    await page.goto('/pesan')
    // Skip form errors: go straight to step 2 -> step 3 without dates triggers role=alert.
    const next = page.getByRole('button', { name: 'Lanjut' }).first()
    await next.click()
    await expect(page.getByText('Pilih tanggal mulai & selesai')).toBeVisible()
    await expect(page.locator('p[role="alert"]').first()).toBeVisible()
  })
})
