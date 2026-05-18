"use client";

import { useI18n } from "@/lib/i18n";
import "./LocaleSelector.css";

const locales = [
  { code: "ro" as const, label: "RO" },
  { code: "ru" as const, label: "RU" },
  { code: "en" as const, label: "EN" },
];

export default function LocaleSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="localeSelector">
      {locales.map((loc) => (
        <button
          key={loc.code}
          type="button"
          onClick={() => setLocale(loc.code)}
          className={locale === loc.code ? "active" : ""}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
