// Public API client for the live laptop-rental backend (Cloudflare Worker).
// All responses are wrapped as { data: ... } — publicApi unwraps that.

const API_URL = 'https://laptop-rental-api.adzril-adzim1913937.workers.dev'
const API_KEY = 'lpr_public_dev_key'

export type LaptopCategory = 'Developer' | 'Designer' | 'Student' | 'Business' | 'Gaming'

export type LaptopSpecs = {
  processor: string
  ram: string
  storage: string
  screen?: string
  battery?: string
  gpu?: string
  weight?: string
}

export type Laptop = {
  id: string
  name: string
  brand: string
  model: string
  category: LaptopCategory
  specs: LaptopSpecs
  dailyRate: number
  weeklyRate: number
  monthlyRate: number
  status: string
  slug: string
  description: string
  partnerId: string | null
  quantity?: number
  photoUrl?: string | null
}

export type LaptopFilters = {
  category?: string
  brand?: string
  search?: string
}

export interface BookingPayload {
  laptopSlug: string
  startDate: string
  endDate: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerId?: string
  notes?: string
}

export interface LeadPayload {
  name: string
  phone: string
  email: string
  message: string
  source: string
  preferredStart?: string
  preferredEnd?: string
  laptopInterest?: string
  budget?: string
  purpose?: string
}

export interface BookingStatus {
  bookingNumber: string
  status: string
  paymentStatus?: string
  totalAmount?: number
  startDate: string
  endDate: string
  actualReturnDate?: string | null
  laptop?: { name: string; slug: string } | null
}

export interface BookingLookup {
  bookingNumber: string
  status: string
  paymentStatus: string | null
  startDate: string
  endDate: string
  totalAmount: number
  laptop: { name: string; slug: string }
  createdAt: string
}

export interface BusinessSettings {
  name: string
  phone: string
  email: string
  address: string
  currency: string
  timezone: string
  bank?: { name: string; accountNumber: string; accountHolder: string }
}

export class ApiError extends Error {
  status: number
  code?: string
  constructor(status: number, message: string, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

type FetchOptions = RequestInit & { next?: { revalidate?: number } }

async function publicApi<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { headers, ...rest } = options
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
  })

  const text = await res.text()
  if (!res.ok) {
    let message = res.statusText
    try {
      const j = JSON.parse(text)
      message = j?.message || j?.error?.message || message
    } catch {
      /* keep statusText */
    }
    throw new ApiError(res.status, message, undefined)
  }

  try {
    const j = JSON.parse(text)
    return (j?.data ?? j) as T
  } catch {
    throw new ApiError(0, 'Invalid JSON response from API')
  }
}

export function getLaptops(filters?: LaptopFilters): Promise<Laptop[]> {
  const qs = new URLSearchParams()
  if (filters?.category) qs.set('category', filters.category)
  if (filters?.brand) qs.set('brand', filters.brand)
  if (filters?.search) qs.set('search', filters.search)
  const q = qs.toString()
  return publicApi<Laptop[]>(`/public/laptops${q ? `?${q}` : ''}`, {
    next: { revalidate: 300 },
  })
}

export function getLaptopBySlug(slug: string): Promise<Laptop> {
  return publicApi<Laptop>(`/public/laptops/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  })
}

export function getAvailability(
  startDate: string,
  endDate: string,
  category?: string,
): Promise<Laptop[]> {
  const qs = new URLSearchParams({ startDate, endDate })
  if (category) qs.set('category', category)
  return publicApi<Laptop[]>(`/public/availability?${qs.toString()}`, {
    next: { revalidate: 300 },
  })
}

export interface BookingCreateResult {
  bookingNumber: string
  status: string
  paymentStatus: string
  totalAmount: number
  startDate: string
  endDate: string
  laptop: { id: string; name: string; slug: string }
}

export function createBooking(payload: BookingPayload): Promise<BookingCreateResult> {
  return publicApi<BookingCreateResult>('/public/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getBookingStatus(bookingNumber: string): Promise<BookingStatus> {
  return publicApi<BookingStatus>(
    `/public/bookings/${encodeURIComponent(bookingNumber)}/status`,
    { next: { revalidate: 60 } },
  )
}

// Richer shape for the public invoice view. The backend status endpoint may
// optionally include customer + deposit fields; all are treated as optional so
// the invoice degrades gracefully when they are absent.
export interface InvoiceBooking extends BookingStatus {
  customerName?: string | null
  customerPhone?: string | null
  depositAmount?: number | null
  lateFee?: number | null
  totalPenalty?: number | null
}

export function getBookingInvoice(bookingNumber: string): Promise<InvoiceBooking> {
  return publicApi<InvoiceBooking>(
    `/public/bookings/${encodeURIComponent(bookingNumber)}/status`,
    { next: { revalidate: 60 } },
  )
}

export function getBookingLookup(phone: string): Promise<BookingLookup[]> {
  return publicApi<BookingLookup[]>(
    `/public/bookings/lookup?phone=${encodeURIComponent(phone)}`,
  )
}

export function submitLead(payload: LeadPayload): Promise<{ id: string }> {
  return publicApi<{ id: string }>('/public/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getSettings(): Promise<BusinessSettings> {
  return publicApi<BusinessSettings>('/public/settings', {
    next: { revalidate: 300 },
  })
}
