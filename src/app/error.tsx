'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-16">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-2xl text-ink">Terjadi Kesalahan</h1>
        <p className="mt-3 font-body text-base text-ink-muted">
          {error.message || 'Terjadi kesalahan tak terduga. Silakan coba lagi.'}
        </p>
        <div className="mt-8">
          <Button onClick={reset} variant="primary">Coba Lagi</Button>
        </div>
      </div>
    </section>
  )
}
