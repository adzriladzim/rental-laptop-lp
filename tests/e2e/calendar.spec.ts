import { test, expect } from '@playwright/test'
import { firstLaptopFromCatalog, openBookingFlow, futureISO } from './helpers'

// P0: LP Calendar — booked dates disabled, legend, warning when API fails.
test.describe('Availability calendar', () => {
  test('renders legend and disables past dates', async ({ page }) => {
    const { slug } = await firstLaptopFromCatalog(page)
    await openBookingFlow(page, slug)

    // Legend labels present.
    await expect(page.getByText('Pilih Tanggal Sewa')).toBeVisible()
    await expect(page.getByText('Tersedia')).toBeVisible()
    await expect(page.getByText('Tanggal lewat')).toBeVisible()
    await expect(page.getByText('Sudah dibooking')).toBeVisible()

    // Past-day buttons are disabled. Today is ringed, but a date 2 days before
    // today is guaranteed disabled.
    const past = futureISO(-2)
    const pastBtn = page.locator(`button[aria-label="${past}"]`)
    if ((await pastBtn.count()) > 0) {
      await expect(pastBtn).toBeDisabled()
    }
  })

  test('booked dates are disabled (greyed) when API returns them', async ({ page }) => {
    const { slug } = await firstLaptopFromCatalog(page)
    // Directly hit the calendar on the detail page; intercepted booked-dates
    // response forces a known date to be booked so we can assert the UI.
    await page.route('**/booked-dates*', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ data: { dates: [futureISO(5)] } }),
      }),
    )
    await openBookingFlow(page, slug)

    const booked = page.locator(`button[aria-label="${futureISO(5)}"]`)
    await expect(booked).toBeDisabled()
    await expect(booked).toHaveClass(/line-through/)
  })

  test('shows booking date warning when booked-dates API fails', async ({ page }) => {
    const { slug } = await firstLaptopFromCatalog(page)
    // Force booked-dates endpoint to fail -> amber warning must appear.
    await page.route('**/booked-dates*', (route) => route.fulfill({ status: 500, body: '{}' }))
    await openBookingFlow(page, slug)
    await expect(
      page.getByText(/Gagal memuat data ketersediaan/),
    ).toBeVisible()
  })

  test('shows availability warning when availability API fails', async ({ page }) => {
    const { slug } = await firstLaptopFromCatalog(page)
    await page.route('**/public/availability*', (route) =>
      route.fulfill({ status: 500, body: '{}' }),
    )
    await openBookingFlow(page, slug)
    await expect(page.getByText(/Gagal memuat data ketersediaan/).first()).toBeVisible()
  })
})
