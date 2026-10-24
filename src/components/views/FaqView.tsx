/* Hallmark · macrostructure: Editorial Statement · genre: editorial · theme: custom (Sewaintop)
 * page: /faq · anti-slop: grouped accordion, editorial topic layout, search filter
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { FAQS, FAQS_EN, type FaqItem } from '@/lib/faq'
import { BUSINESS_WA } from '@/lib/whatsapp'

type TopicKey = 'all' | 'booking' | 'pembayaran' | 'pengiriman' | 'pengembalian'

interface TopicDef {
  key: TopicKey
  label: string
  ids: string[]
}

function getTopics(t: ReturnType<typeof useI18n>['t']): TopicDef[] {
  return [
    { key: 'all', label: 'Semua', ids: [] },
    { key: 'booking', label: 'Booking', ids: ['cara-sewa', 'durasi', 'verification'] },
    { key: 'pembayaran', label: 'Pembayaran', ids: ['harga', 'deposit', 'payment', 'cancellation'] },
    { key: 'pengiriman', label: 'Pengiriman', ids: ['area', 'delivery', 'corporate'] },
    { key: 'pengembalian', label: 'Pengembalian', ids: ['late', 'insurance'] },
  ]
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-4 py-5 text-left"
      >
        {/* Question marker */}
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
            isOpen
              ? 'bg-accent text-accent-fg'
              : 'bg-ink/5 text-ink-muted group-hover:bg-accent/10 group-hover:text-accent'
          }`}
        >
          ?
        </span>
        <span className="flex-1 font-display text-lg text-ink transition-colors group-hover:text-accent">
          {item.question}
        </span>
        {/* Chevron */}
        <span
          aria-hidden
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-accent' : 'text-ink-muted/40'
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-10">
          <p className="max-w-3xl font-body text-base leading-relaxed text-ink-muted">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqView() {
  const { t, locale } = useI18n()
  const allItems = locale === 'en' ? FAQS_EN : FAQS
  const topics = getTopics(t)

  const [activeTopic, setActiveTopic] = useState<TopicKey>('all')
  const [search, setSearch] = useState('')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(allItems[0] ? [allItems[0].id] : []))

  const filtered = useMemo(() => {
    let items = allItems
    if (activeTopic !== 'all') {
      const topic = topics.find((t) => t.key === activeTopic)
      if (topic) items = items.filter((i) => topic.ids.includes(i.id))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q),
      )
    }
    return items
  }, [allItems, activeTopic, search, topics])

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const topicCounts = useMemo(() => {
    const counts: Record<TopicKey, number> = { all: allItems.length, booking: 0, pembayaran: 0, pengiriman: 0, pengembalian: 0 }
    for (const item of allItems) {
      for (const topic of topics) {
        if (topic.key !== 'all' && topic.ids.includes(item.id)) {
          counts[topic.key]++
        }
      }
    }
    return counts
  }, [allItems, topics])

  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.12 0.06 245 / 0.95) 0%, oklch(0.12 0.06 245 / 0.8) 100%)',
          }}
        />
        <div className="absolute -right-16 top-[25%] h-[450px] w-[3px] -rotate-[15deg] bg-accent opacity-35" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
              {t.faq.eyebrow}
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl">
              {t.faq.title1}{' '}
              <span className="text-accent">{t.faq.title2}</span>{' '}
              {t.faq.title3}
            </h1>
            <p className="max-w-xl text-lg text-paper/60">{t.faq.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── Search + Topic Filter ── */}
      <section className="border-b border-border bg-paper-subtle">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full rounded-xl border border-border bg-paper py-3 pl-10 pr-4 font-body text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Cari pertanyaan FAQ"
            />
          </div>
          {/* Topic pills — with counts */}
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic.key}
                type="button"
                onClick={() => setActiveTopic(topic.key)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                  activeTopic === topic.key
                    ? 'bg-ink text-paper'
                    : 'border border-border bg-paper text-ink-muted hover:border-ink hover:text-ink'
                }`}
              >
                {topic.label}
                {topicCounts[topic.key] > 0 && (
                  <span className="ml-1.5 text-xs opacity-60">{topicCounts[topic.key]}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-ink-muted">Tidak ada pertanyaan yang cocok.</p>
          ) : (
            <div>
              {filtered.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openIds.has(item.id)}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mb-4 font-display text-2xl font-bold text-paper sm:text-3xl">
              {t.faq.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-paper/60">{t.faq.ctaSubtitle}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href="/kontak" size="lg">
                {t.faq.ctaContact}
              </Button>
              <WhatsAppButton
                phone={BUSINESS_WA}
                message="Halo! Saya punya pertanyaan soal sewa laptop."
                className="inline-flex items-center gap-2 rounded-lg border border-paper/30 bg-transparent px-6 py-3 font-display text-sm font-semibold text-paper/70 transition-all hover:border-accent hover:text-paper min-h-[48px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
                </svg>
                {t.faq.ctaWa}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
