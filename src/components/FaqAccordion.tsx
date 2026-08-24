'use client'

import { useState } from 'react'
import type { FaqItem } from '@/lib/faq'

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set(items[0] ? [items[0].id] : []))

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="border-t border-border divide-y divide-border">
      {items.map((item) => {
        const isOpen = open.has(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                {item.question}
              </span>
              <span
                aria-hidden
                className={`relative ml-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border text-accent transition-transform duration-200 ${
                  isOpen ? 'rotate-45 bg-accent text-accent-fg border-accent' : ''
                }`}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <p className="max-w-3xl pb-6 font-body text-base leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
