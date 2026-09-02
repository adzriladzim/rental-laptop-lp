'use client'

import { useEffect, useMemo, useState } from 'react'
import { getAvailability, getBookedDates } from '@/lib/api'

interface AvailabilityCalendarProps {
  laptopId: string
  laptopCategory?: string
  laptopSlug?: string
  onSelectDates?: (dates: string[]) => void
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
  laptopSlug,
  onSelectDates,
}: AvailabilityCalendarProps) {
  const today = todayISO()
  const initial = new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth() + 1)

  const [anchor, setAnchor] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const [note, setNote] = useState<string | null>(null)
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set())
  const [bookedWarning, setBookedWarning] = useState<string | null>(null)

  const { first, last, daysInMonth } = useMemo(() => {
    const dim = new Date(viewYear, viewMonth, 0).getDate()
    return {
      first: toISO(viewYear, viewMonth, 1),
      last: toISO(viewYear, viewMonth, dim),
      daysInMonth: dim,
    }
  }, [viewYear, viewMonth])

  useEffect(() => {
    let cancelled = false
    getAvailability(first, last, laptopCategory)
      .then((available) => {
        if (cancelled) return
        const isAvailable = available.some((l) => l.id === laptopId)
        setNote(
          isAvailable
            ? `Tersedia periode ${MONTH_NAMES[viewMonth - 1]} ${viewYear}`
            : `Tidak tersedia periode ${MONTH_NAMES[viewMonth - 1]} ${viewYear}`,
        )
      })
      .catch(() => {
        if (cancelled) return
        setNote('Gagal memuat data ketersediaan')
      })
    return () => { cancelled = true }
  }, [laptopId, laptopCategory, first, last, viewMonth, viewYear, daysInMonth])

  useEffect(() => {
    if (!laptopSlug) return
    let cancelled = false
    setBookedWarning(null)
    getBookedDates(laptopSlug, first, last)
      .then(({ dates }) => {
        if (cancelled) return
        setBookedDates(new Set(dates))
      })
      .catch((err) => {
        if (cancelled) return
        console.error('Gagal memuat tanggal terbooking:', err)
        setBookedDates(new Set())
        setBookedWarning('Gagal memuat data ketersediaan. Tanggal terbooking mungkin tidak tampil.')
      })
    return () => { cancelled = true }
  }, [laptopSlug, first, last])

  const firstWeekday = (new Date(viewYear, viewMonth - 1, 1).getDay() + 6) % 7

  const cells: (number | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isPast = (day: number) => toISO(viewYear, viewMonth, day) < today
  const selectedSet = useMemo(() => new Set(selected), [selected])
  const emit = (dates: string[]) => onSelectDates?.(dates)

  const handlePick = (day: number) => {
    const iso = toISO(viewYear, viewMonth, day)
    if (isPast(day)) return
    if (bookedDates.has(iso)) return

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

  const hint = pending
    ? 'Klik tanggal akhir — atau klik tanggal yang sama lagi untuk sewa 1 hari.'
    : selected.length > 0
      ? 'Klik tanggal terpilih untuk membuang hari itu. Klik tanggal lain untuk mulai pilih baru.'
      : 'Klik tanggal mulai, lalu klik tanggal akhir — rentang langsung terisi.'

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-ink">Pilih Tanggal Sewa</h3>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded text-xs font-semibold text-ink transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Hapus pilihan
          </button>
        )}
      </div>

      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Bulan sebelumnya"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink transition-colors hover:bg-paper-subtle"
        >
          ‹
        </button>
        <p className="font-display text-base font-semibold text-ink">
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </p>
        <button
          type="button"
          onClick={goNext}
          aria-label="Bulan berikutnya"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink transition-colors hover:bg-paper-subtle"
        >
          ›
        </button>
      </div>

      {note && (
        <p className="mb-2 text-xs text-ink-muted">{note}</p>
      )}
      {bookedWarning && (
        <p className="mb-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700" role="alert">
          {bookedWarning}
        </p>
      )}
      <p className="mb-3 text-xs text-ink-muted" aria-live="polite">{hint}</p>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {w}
          </div>
        ))}
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e${idx}`} aria-hidden />
          const iso = toISO(viewYear, viewMonth, day)
          const past = isPast(day)
          const isBooked = bookedDates.has(iso)
          const isToday = iso === today
          const isSelected = selectedSet.has(iso)
          const isAnchor = pending && iso === anchor

          let cls =
            'grid aspect-square place-items-center rounded-lg text-sm border font-medium transition-all'
          if (past) {
            cls += ' bg-paper-subtle/50 text-ink-muted/50 border-transparent cursor-not-allowed'
          } else if (isBooked) {
            cls += ' bg-gray-500 text-white line-through cursor-not-allowed border-gray-600'
          } else if (isSelected) {
            cls += ' bg-accent text-accent-fg border-accent shadow-sm cursor-pointer'
          } else if (isAnchor) {
            cls += ' bg-accent/20 text-ink border-accent cursor-pointer animate-pulse'
          } else {
            cls += ' bg-accent/5 text-ink border-accent/20 hover:border-accent/50 hover:bg-accent/10 cursor-pointer'
          }
          if (isToday && !isSelected) cls += ' ring-2 ring-accent/40 ring-offset-1 ring-offset-paper'

          return (
            <button
              key={iso}
              type="button"
              disabled={past || isBooked}
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

      {selected.length > 0 && (
        <div className="mt-3 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
          <span className="font-semibold text-ink">{formatDatesSummary(selected)}</span>
          <span className="text-ink-muted"> · {selected.length} hari dipilih</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded border border-orange-400 bg-orange-100 text-xs font-semibold text-orange-800">✓</span>
          Tersedia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded border border-gray-300 bg-gray-200 text-xs font-semibold text-gray-500">—</span>
          Tanggal lewat
        </span>
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded border border-gray-600 bg-gray-500 text-xs font-semibold text-white">✕</span>
          Sudah dibooking
        </span>
      </div>
    </div>
  )
}
