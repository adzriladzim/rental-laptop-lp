import { test, expect } from '@playwright/test'
import { firstLaptopFromCatalog, openBookingFlow, futureISO } from './helpers'

// P0: LP Booking happy path — /laptop -> /laptop/[slug] -> /pesan step1-4 -> submit -> status.
test.describe('Booking happy path', () => {
  test('navigates catalog -> detail -> booking wizard and reaches step 2', async ({ page }) => {
    await page.goto('/laptop')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Sewa Laptop')

    // Detail page
    const card = page.locator('a[href^="/laptop/"]').first()
    const slug = (await card.getAttribute('href'))!.split('/').pop()!
    await card.click()
    await expect(page).toHaveURL(new RegExp(`/laptop/${slug}$`))
    await expect(page.getByRole('link', { name: 'Pesan Sekarang' }).first()).toBeVisible()
  })

  test('full wizard: pick unit, dates, fill step 3 & 4, submit -> success screen', async ({ page }) => {
    test.setTimeout(90_000)
    // Use dell-vostro-3400 which has NO seed bookings (lenovo-thinkpad-x280 has seed booking Sep 1-7)
    await openBookingFlow(page, 'dell-vostro-3400')

    // Step 2 — wait for calendar, click 2 day buttons
    await page.waitForSelector('button >> text=/^\\d{1,2}$/', { timeout: 15_000 })
    await page.waitForTimeout(2000)
    const dayBtns = page.locator('button').filter({ hasText: /^\d{1,2}$/ })
    const dayCount = await dayBtns.count()
    const clickedDays: string[] = []
    for (let i = 0; i < dayCount && clickedDays.length < 2; i++) {
      const btn = dayBtns.nth(i)
      const isDisabled = await btn.isDisabled()
      if (!isDisabled) {
        const text = (await btn.innerText()).trim()
        await btn.click()
        clickedDays.push(text)
        await page.waitForTimeout(500)
      }
    }
    console.log('Clicked days:', clickedDays)
    // Wait for availability + click Next
    await page.waitForTimeout(3000)
    const nextBtn = page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first()
    await nextBtn.click({ timeout: 10_000 })

    // Step 3 — essential fields (labels in EN due to browser locale).
    await expect(page.getByLabel('Full Name')).toBeVisible()
    await page.getByLabel('Full Name').fill('QA Test User')
    await page.getByLabel('Phone Number').fill('081234567890')
    await page.getByLabel('Home Address').fill('Jl. QA No. 1, Jakarta')
    await page.getByLabel('Delivery Location + Maps Link').fill('Jakarta Selatan')
    await page.getByLabel('Office Address').fill('Jakarta Pusat')
    await page.locator('#doc1').selectOption('KTP')
    await page.locator('#doc2').selectOption('SIM')
    await page.getByLabel('Rental Reason').fill('Ujian sertifikasi')
    await page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first().click()

    // Step 4 — additional fields (EN locale).
    await expect(page.getByLabel('Relation')).toBeVisible()
    await page.locator('#familyContactRelation').selectOption({ index: 1 })
    await page.getByLabel('Family Contact Phone Number').fill('081298765432')
    await page.getByLabel('Instagram Account').fill('qa_test')
    await page.getByLabel('LinkedIn (Optional)').fill('linkedin.com/in/qa')
    // Radio labels intercept pointer events — use force click
    await page.getByRole('radio', { name: 'Yes' }).first().check({ force: true })
    await page.getByRole('radio', { name: 'Yes' }).nth(1).check({ force: true })
    await page.getByRole('checkbox').check({ force: true })

    // Submit -> success screen shows booking number.
    await page.getByRole('button', { name: 'Book Now' }).click()
    await expect(page.getByText(/Booking (Berhasil|Successful)/i)).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Booking Number|Nomor Booking/i)).toBeVisible()
    // Status badge present (pending).
    await expect(page.getByText(/Menunggu Pembayaran|Awaiting Payment/i)).toBeVisible()
  })
})
