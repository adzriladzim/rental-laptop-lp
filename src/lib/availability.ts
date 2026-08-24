// Deterministic mock availability — no backend yet.
// Stable across renders via FNV-1a hash seeded by laptopId + year + month + day,
// so the same day is always booked/unbooked for a given unit.

function hashString(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

// month is 1-indexed (calendar month 1-12)
function toISO(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`
}

// ~25% of days booked
const BOOKED_RATE = 25

function isDayBooked(laptopId: string, year: number, month: number, day: number): boolean {
  return hashString(`${laptopId}|${year}|${month}|${day}`) % 100 < BOOKED_RATE
}

export function getBookedDates(laptopId: string, year: number, month: number): string[] {
  const daysInMonth = new Date(year, month, 0).getDate()
  const booked: string[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    if (isDayBooked(laptopId, year, month, d)) booked.push(toISO(year, month, d))
  }
  return booked
}

export function isAvailable(laptopId: string, date: string): boolean {
  const [y, m, d] = date.split('-').map(Number)
  return !isDayBooked(laptopId, y, m, d)
}

export function getNextAvailable(laptopId: string, fromDate: string): string {
  const start = new Date(`${fromDate}T00:00:00`)
  if (Number.isNaN(start.getTime())) return fromDate
  for (let i = 0; i < 366; i++) {
    const cur = new Date(start)
    cur.setDate(start.getDate() + i)
    const iso = toISO(cur.getFullYear(), cur.getMonth() + 1, cur.getDate())
    if (isAvailable(laptopId, iso)) return iso
  }
  return fromDate
}
