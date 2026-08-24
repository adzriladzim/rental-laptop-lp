'use client'

interface LocationPickerProps {
  value: string
  onChange: (value: string) => void
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const mapsUrl =
    value.trim().length > 2
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value.trim())}`
      : null

  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">Lokasi Pengantaran</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Contoh: Jl. Margonda Raya No. 25, Depok"
          className="w-full rounded-lg border border-border bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Cek di Google Maps
          </a>
        ) : (
          <span className="text-xs text-ink-muted">
            Ketik alamat, lalu link Google Maps otomatis dikirim ke tim kami via WhatsApp.
          </span>
        )}
      </div>
    </div>
  )
}
