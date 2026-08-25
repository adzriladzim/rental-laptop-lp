'use client'

import { useEffect, useMemo, useState } from 'react'
import { getBookedDates } from '@/lib/availability'
import { getAvailability } from '@/lib/api'

interface AvailabilityCalendarProps {
  laptopId: string
  laptopSlug?: string
  laptopCategory?: string
  onSelectDates?: (dates: string[]) => void
  live?: boolean
}

const WEEKDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function toISO(y: number, m: number, d: number): string {
  return `${y}-${pad(m)}-${pad(d)}`
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Expand inclusive ISO date range to a list of ISO dates. */
function expandRange(start: string, end: string): string[] {
  const out: string[] = []
  const cur = new Date(`${start}T00:00:00`)
  const stop = new Date(`${end}T00:00:00`)
  while (cur <= stop) {
    out.push(toISO(cur.getFullYear(), cur.getMonth() + 1, cur.getDate()))
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

/** Human summary: contiguous runs become "26–30 Agu", singles "26 Agu", joined with ", ". */
export function formatDatesSummary(dates: string[]): string {
  if (dates.length === 0) return ''
  const sorted = [...dates].sort()
  const runs: string[][] = [[sorted[0]]]
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(`${runs[runs.length - 1][runs[runs.length - 1].length - 1]}T00:00:00`)
    prev.setDate(prev.getDate() + 1)
    if (toISO(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()) === sorted[i]) {
      runs[runs.length - 1].push(sorted[i])
    } else {
      runs.push([sorted[i]])
    }
  }
  return runs
    .map((run) => {
      const [a, b] = [run[0], run[run.length - 1]]
      const da = new Date(`${a}T00:00:00`)
      const db = new Date(`${b}T00:00:00`)
      const fa = `${da.getDate()} ${MONTH_SHORT[da.getMonth()]}`
      const fb = `${db.getDate()} ${MONTH_SHORT[db.getMonth()]}`
      return run.length === 1 ? fa : `${fa}–${fb}`
    })
    .join(', ')
}

export function AvailabilityCalendar({
  laptopId,
  laptopCategory,
  onSelectDates,
  live,
}: AvailabilityCalendarProps) {
  const today = todayISO()
  const initial = new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth() + 1) // 1-indexed

  // Unified selection flow (no modes):
  //  - click 1: anchor date (single pick pending)
  //  - click 2: range fills anchor→date (same date = confirmed single day)
  //  - click a selected date: remove that day (for custom non-contiguous picks)
  //  - click any other available date: start a fresh selection
  const [anchor, setAnchor] = useState<string | null>(null)
  const [pending, setPending] = useState(false) // anchor set, awaiting 2nd click
  const [selected, setSelected] = useState<string[]>([])

  // live = range-level availability from API (whole-month granularity)
  const [liveBooked, setLiveBooked] = useState<boolean | null>(null)
  const [note, setNote] = useState<string | null>(null)

  const { first, last, daysInMonth } = useMemo(() => {
    const dim = new Date(viewYear, viewMonth, 0).getDate()
    return {
      first: toISO(viewYear, viewMonth, 1),
      last: toISO(viewYear, viewMonth, dim),
      daysInMonth: dim,
    }
  }, [viewYear, viewMonth])

  useEffect(() => {
    if (!live) return
    let cancelled = false
    getAvailability(first, last, laptopCategory)
      .then((available) => {
        if (cancelled) return
        const isAvailable = available.some((l) => l.id === laptopId)
        setLiveBooked(!isAvailable)
        setNote(
          isAvailable
            ? `Tersedia periode ${MONTH_NAMES[viewMonth - 1]} ${viewYear} (data live)`
            : `Tidak tersedia periode ${MONTH_NAMES[viewMonth - 1]} ${viewYear} (data live)`,
        )
      })
      .catch(() => {
        if (cancelled) return
        // fall back to deterministic mock
        setLiveBooked(null)
        setNote('Data estimasi (offline)')
      })
    return () => {
      cancelled = true
    }
  }, [live, laptopId, laptopCategory, first, last, viewMonth, viewYear])

  const bookedSet = useMemo(() => {
    if (live && liveBooked !== null) {
      const s = new Set<string>()
      if (liveBooked) {
        for (let d = 1; d <= daysInMonth; d++) s.add(toISO(viewYear, viewMonth, d))
      }
      return s
    }
    return new Set(getBookedDates(laptopId, viewYear, viewMonth))
  }, [live, liveBooked, laptopId, viewYear, viewMonth, daysInMonth])

  const firstWeekday = (new Date(viewYear, viewMonth - 1, 1).getDay() + 6) % 7 // Mon = 0

  const cells: (number | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isPast = (day: number) => toISO(viewYear, viewMonth, day) < today

  const selectedSet = useMemo(() => new Set(selected), [selected])

  const emit = (dates: string[]) => onSelectDates?.(dates)

  const handlePick = (day: number) => {
    const iso = toISO(viewYear, viewMonth, day)
    if (bookedSet.has(iso) || isPast(day)) return

    // Awaiting 2nd click → build range (or confirm single day)
    if (pending && anchor) {
      if (iso === anchor) {
        setPending(false)
        setSelected([iso])
        emit([iso])
        return
      }
      const [a, b] = iso <= anchor ? [iso, anchor] : [anchor, iso]
      const range = expandRange(a, b)
      setPending(false)
      setSelected(range)
      emit(range)
      return
    }

    // Selection complete → toggle off picked days, else start fresh
    if (selectedSet.has(iso)) {
      const next = selected.filter((d) => d !== iso)
      setSelected(next)
      setAnchor(next.length > 0 ? anchor : null)
      emit(next)
      return
    }

    setAnchor(iso)
    setPending(true)
    setSelected([iso])
    emit([iso])
  }

  const clearAll = () => {
    setAnchor(null)
    setPending(false)
    setSelected([])
    emit([])
  }

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

  // Preview band while awaiting 2nd click (hover-independent: anchor→today's hovered cell is
  // skipped for simplicity; band only shows after range is chosen)
  const hint = pending
    ? 'Sekarang klik tanggal akhir — atau klik tanggal yang sama lagi untuk sewa 1 hari.'
    : selected.length > 0
      ? 'Klik tanggal terpilih untuk membuang hari itu. Klik tanggal lain untuk mulai pilih baru.'
      : 'Klik tanggal mulai, lalu klik tanggal akhir — rentang langsung terisi.'

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg text-ink">Pilih Tanggal Sewa</h3>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-accent hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          >
            Hapus pilihan
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Bulan sebelumnya"
          className="h-9 w-9 grid place-items-center rounded-md border border-border text-ink hover:bg-paper-subtle transition-colors"
        >
          {'<'}
        </button>
        <p className="font-display text-lg text-ink">
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </p>
        <button
          type="button"
          onClick={goNext}
          aria-label="Bulan berikutnya"
          className="h-9 w-9 grid place-items-center rounded-md border border-border text-ink hover:bg-paper-subtle transition-colors"
        >
          {'>'}
        </button>
      </div>

      {note && (
        <p className="mb-2 font-body text-xs text-ink-muted">{note}</p>
      )}
      <p className="mb-2 font-body text-xs text-ink-muted" aria-live="polite">{hint}</p>

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
          const isSelected = selectedSet.has(iso)
          const isAnchor = pending && iso === anchor
          const disabled = booked || past
          let cls =
            'aspect-square grid place-items-center rounded-md text-sm font-body border transition-colors'
          if (booked) cls += ' bg-paper-subtle text-ink-muted border-border line-through'
          else if (past)
            cls += ' bg-paper-subtle/50 text-ink-muted/60 border-transparent cursor-not-allowed'
          else if (isSelected) cls += ' bg-accent text-accent-fg border-accent font-semibold cursor-pointer'
          else if (isAnchor) cls += ' bg-accent/25 text-ink border-accent cursor-pointer animate-pulse'
          else cls += ' bg-accent/10 text-ink border-accent/40 hover:bg-accent/20 cursor-pointer'
          if (isToday && !isSelected) cls += ' ring-2 ring-accent ring-offset-1 ring-offset-paper'
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

      {/* Selection summary */}
      {selected.length > 0 && (
        <div className="mt-3 rounded-lg bg-accent/10 border border-accent/30 px-3 py-2 text-sm">
          <span className="font-semibold text-ink">{formatDatesSummary(selected)}</span>
          <span className="text-ink-muted"> · {selected.length} hari dipilih</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-body text-ink-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-accent/20 border border-accent/40" />
          Tersedia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-paper-subtle border border-border line-through" />
          Terisi (sudah dibooking)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-paper-subtle/50 border border-transparent" />
          Tanggal lewat
        </span>
      </div>
    </div>
  )
}
