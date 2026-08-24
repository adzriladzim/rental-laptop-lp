'use client'

import { useMemo, useState } from 'react'
import { getBookedDates } from '@/lib/availability'

interface AvailabilityCalendarProps {
  laptopId: string
  onSelectDate?: (date: string) => void
}

const WEEKDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function toISO(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function todayISO(): string {
  const t = new Date().toISOString().slice(0, 10)
  return t
}

export function AvailabilityCalendar({ laptopId, onSelectDate }: AvailabilityCalendarProps) {
  const today = todayISO()
  const initial = new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth() + 1) // 1-indexed
  const [selected, setSelected] = useState<string | null>(null)

  const bookedSet = useMemo(
    () => new Set(getBookedDates(laptopId, viewYear, viewMonth)),
    [laptopId, viewYear, viewMonth],
  )

  const firstWeekday = (new Date(viewYear, viewMonth - 1, 1).getDay() + 6) % 7 // Mon = 0
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isPast = (day: number) => toISO(viewYear, viewMonth, day) < today

  const goPrev = () => {
    if (viewMonth === 1) {
      setViewMonth(12)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goNext = () => {
    if (viewMonth === 12) {
      setViewMonth(1)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handlePick = (day: number) => {
    const iso = toISO(viewYear, viewMonth, day)
    if (bookedSet.has(iso) || isPast(day)) return
    setSelected(iso)
    onSelectDate?.(iso)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Bulan sebelumnya"
          className="h-9 w-9 grid place-items-center rounded-md border border-border text-ink hover:bg-paper-subtle transition-colors"
        >
          {'<'}
        </button>
        <h3 className="font-display text-lg text-ink">
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </h3>
        <button
          type="button"
          onClick={goNext}
          aria-label="Bulan berikutnya"
          className="h-9 w-9 grid place-items-center rounded-md border border-border text-ink hover:bg-paper-subtle transition-colors"
        >
          {'>'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-xs font-body uppercase tracking-wide text-ink-muted py-1">
            {w}
          </div>
        ))}
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e${idx}`} aria-hidden />
          const iso = toISO(viewYear, viewMonth, day)
          const booked = bookedSet.has(iso)
          const past = isPast(day)
          const isToday = iso === today
          const isSelected = iso === selected
          const disabled = booked || past
          let cls =
            'aspect-square grid place-items-center rounded-md text-sm font-body border transition-colors'
          if (booked) cls += ' bg-paper-subtle text-ink-muted border-border line-through'
          else if (past)
            cls += ' bg-paper-subtle/50 text-ink-muted/60 border-transparent cursor-not-allowed'
          else cls += ' bg-accent/10 text-ink border-accent/40 hover:bg-accent/20 cursor-pointer'
          if (isToday) cls += ' ring-2 ring-accent ring-offset-1 ring-offset-paper'
          if (isSelected) cls += ' ring-2 ring-accent'
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => handlePick(day)}
              aria-pressed={isSelected}
              aria-label={iso}
              className={cls}
            >
              {day}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs font-body text-ink-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-accent/20 border border-accent/40" />
          Tersedia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-paper-subtle border border-border line-through" />
          Terisi
        </span>
      </div>
    </div>
  )
}
