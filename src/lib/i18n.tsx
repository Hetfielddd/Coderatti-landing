"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import ro from "../../messages/ro.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";

const messages = { ro, ru, en };
type Locale = "ro" | "ru" | "en";

function getValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tRaw: (key: string) => unknown;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ro");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") as Locale;
    if (lang && messages[lang]) {
      setLocaleState(lang);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    const params = new URLSearchParams(window.location.search);
    params.set("lang", newLocale);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }, []);

  const t = useCallback(
    (key: string) => {
      const value = getValue(messages[locale], key);
      return typeof value === "string" ? value : key;
    },
    [locale]
  );

  const tRaw = useCallback(
    (key: string) => {
      return getValue(messages[locale], key);
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tRaw }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
