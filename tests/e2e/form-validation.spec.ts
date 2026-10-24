import { test, expect } from '@playwright/test'
import { firstLaptopFromCatalog, openBookingFlow, futureISO } from './helpers'

// P0: LP Form validation — required fields, doc1 != doc2, phone length, agree.
test.describe('Booking form validation', () => {
  async function reachStep3(page: import('@playwright/test').Page) {
    // Use macbook-air-m1 which has NO seed bookings
    await openBookingFlow(page, 'macbook-air-m1')
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
    await page.waitForTimeout(3000)
    await page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first().click({ timeout: 10_000 })
  }

  test('step 3 blocks empty required fields (name/phone/addresses/docs/reason)', async ({ page }) => {
    await reachStep3(page)
    await page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first().click()

    await expect(page.getByText('Nama wajib diisi')).toBeVisible()
    await expect(page.getByText('Nomor HP minimal 8 digit')).toBeVisible()
    await expect(page.getByText('Alamat rumah wajib diisi')).toBeVisible()
    await expect(page.getByText('Lokasi pengiriman wajib diisi')).toBeVisible()
    await expect(page.getByText('Alamat kantor wajib diisi')).toBeVisible()
    await expect(page.getByText('Pilih dokumen jaminan 1')).toBeVisible()
    await expect(page.getByText('Pilih dokumen jaminan 2')).toBeVisible()
    await expect(page.getByText('Alasan sewa wajib diisi')).toBeVisible()
  })

  test('rejects identical guarantee documents', async ({ page }) => {
    await reachStep3(page)
    await page.getByLabel('Full Name').fill('QA Test User')
    await page.getByLabel('Phone Number').fill('081234567890')
    await page.getByLabel('Home Address').fill('Jl. QA No. 1')
    await page.getByLabel('Delivery Location + Maps Link').fill('Jakarta Selatan')
    await page.getByLabel('Office Address').fill('Jakarta Pusat')
    await page.locator('#doc1').selectOption('KTP')
    await page.locator('#doc2').selectOption('KTP')
    await page.getByLabel('Rental Reason').fill('Ujian')
    await page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first().click()

    await expect(page.getByText('Dokumen jaminan tidak boleh sama')).toBeVisible()
  })

  test('rejects short phone number in step 3', async ({ page }) => {
    await reachStep3(page)
    await page.getByLabel('Full Name').fill('QA Test User')
    await page.getByLabel('Phone Number').fill('0812') // < 8 digits
    await page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first().click()
    await expect(page.getByText('Nomor HP minimal 8 digit')).toBeVisible()
  })

  test('step 4 blocks missing relation/instagram/radio/agree', async ({ page }) => {
    await reachStep3(page)
    await page.getByLabel('Full Name').fill('QA Test User')
    await page.getByLabel('Phone Number').fill('081234567890')
    await page.getByLabel('Home Address').fill('Jl. QA No. 1')
    await page.getByLabel('Delivery Location + Maps Link').fill('Jakarta Selatan')
    await page.getByLabel('Office Address').fill('Jakarta Pusat')
    await page.locator('#doc1').selectOption('KTP')
    await page.locator('#doc2').selectOption('SIM')
    await page.getByLabel('Rental Reason').fill('Ujian')
    await page.locator('button').filter({ hasText: /^(Lanjut|Next)$/ }).first().click()

    await expect(page.getByText('Relationship')).toBeVisible()
    // Submit without anything filled.
    await page.getByRole('button', { name: 'Book Now' }).click()

    await expect(page.getByText('Relation is required')).toBeVisible()
    await expect(page.getByText('Instagram Account is required')).toBeVisible()
    await expect(page.getByText('Please select one').first()).toBeVisible()
    await expect(page.getByText('You must agree to the Terms')).toBeVisible()
  })
})
