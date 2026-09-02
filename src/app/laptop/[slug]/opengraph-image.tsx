import { ImageResponse } from 'next/og'
import { getLaptopBySlug } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'

export const alt = 'Sewa laptop di Sewaintop'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function getLaptop(slug: string) {
  try {
    return await getLaptopBySlug(slug)
  } catch {
    return FALLBACK_LAPTOPS.find((l) => l.slug === slug)
  }
}

function formatIDRog(n: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const laptop = await getLaptop(slug)

  const name = laptop?.name ?? 'Sewa Laptop'
  const brand = laptop?.brand ?? 'Sewaintop'
  const specLine = laptop
    ? [laptop.specs.processor, laptop.specs.ram, laptop.specs.storage]
        .filter(Boolean)
        .join(' · ')
    : ''
  const price = laptop
    ? `${formatIDRog(laptop.dailyRate)}/hari`
    : 'Mulai Rp175.000/hari'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0D1B3D',
          color: '#FFFFFF',
          padding: '64px 72px',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 72,
            width: 120,
            height: 6,
            background: '#FF6A00',
            borderRadius: '0 0 6px 6px',
          }}
        />

        {/* Header: logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: '#FF6A00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 800,
              color: '#0D1B3D',
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Sewain<span style={{ color: '#FF6A00' }}>top</span></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              Sewa Laptop Profesional Jakarta
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#FF6A00',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {brand}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '100%',
            }}
          >
            {name}
          </div>
          {specLine && (
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.75)' }}>
              {specLine}
            </div>
          )}
          <div style={{ fontSize: 30, fontWeight: 700, color: '#FF6A00', marginTop: 8 }}>
            {price}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 700 }}>Sewa di Sewaintop</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#0D1B3D',
              background: '#FF6A00',
              padding: '12px 24px',
              borderRadius: 12,
            }}
          >
            Pesan Sekarang
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
