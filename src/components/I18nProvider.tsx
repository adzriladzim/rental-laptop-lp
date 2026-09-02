'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import {
  detectLocale,
  persistLocale,
  type Locale,
  type Translation,
  t,
} from '@/lib/i18n'

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Translation
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    persistLocale(l)
    document.documentElement.lang = l
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: t(locale) }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
