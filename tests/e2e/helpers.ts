import { Page, expect } from '@playwright/test'

// Shared utilities for LP e2e tests.

/** The first laptop slug + name from the catalog page. Used to drive booking flow. */
export async function firstLaptopFromCatalog(page: Page): Promise<{ slug: string; name: string }> {
  await page.goto('/laptop')
  // Each card links to /laptop/<slug>. Grab the first catalog card link.
  const card = page.locator('a[href^="/laptop/"]').first()
  const href = await card.getAttribute('href')
  const slug = href!.split('/').pop()!
  const name = await card.locator('h2').innerText()
  return { slug, name }
}

/** Navigate to /pesan with a preselected unit (skips step 1). */
export async function openBookingFlow(page: Page, slug: string): Promise<void> {
  await page.goto(`/pesan?unit=${slug}`)
  await expect(page.getByText('Pilih Tanggal Sewa')).toBeVisible()
}

/**
 * Pick a date range on the calendar by clicking two enabled day buttons.
 * Returns the picked day numbers (for later assertions) — caller supplies
 * current-month future days via click; we pick "today+t" to stay valid.
 */
export async function pickDateRange(page: Page, startDayLabel: string, endDayLabel: string): Promise<void> {
  const startBtn = page.locator(`button[aria-label][type="button"]`, { hasText: /^[0-9]{1,2}$/ }).filter({
    has: page.locator('text=placeholder'),
  })
  void startBtn
  // Days are rendered as <button aria-label="YYYY-MM-DD">N</button>.
  await page.locator(`button[aria-label="${startDayLabel}"]`).click()
  await page.locator(`button[aria-label="${endDayLabel}"]`).click()
}

/** Compute a future ISO date (YYYY-MM-DD) offset from today. */
export function futureISO(offsetDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}
