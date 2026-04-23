'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { locales, translations, type Locale } from './translations';

const LocaleSchema = z.enum(locales);
const STORAGE_KEY = 'blendermcp_locale';

function resolveLocale(raw: unknown): Locale {
  const result = LocaleSchema.safeParse(raw);
  return result.success ? result.data : 'es';
}

type TranslationMap = typeof translations[Locale];

interface I18nContextValue {
  locale: Locale;
  t: TranslationMap;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setLocaleState(resolveLocale(stored));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    const validated = resolveLocale(next);
    localStorage.setItem(STORAGE_KEY, validated);
    setLocaleState(validated);
  }, []);

  const value = useMemo(
    () => ({ locale, t: translations[locale] as TranslationMap, setLocale }),
    [locale, setLocale]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
