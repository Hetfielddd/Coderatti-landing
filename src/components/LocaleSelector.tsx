"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import "./LocaleSelector.css";

const locales = [
  { code: "ro" as const, label: "RO" },
  { code: "ru" as const, label: "RU" },
  { code: "en" as const, label: "EN" },
];

export default function LocaleSelector() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <div className="localeSelector" ref={ref}>
      <button
        type="button"
        className="localeSelectorTrigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        {current.label}
        <span className={open ? "localeSelectorArrow open" : "localeSelectorArrow"}>▼</span>
      </button>
      {open && (
        <div className="localeSelectorDropdown">
          {locales.map((loc) => (
            <button
              key={loc.code}
              type="button"
              className={locale === loc.code ? "active" : ""}
              onClick={() => {
                setLocale(loc.code);
                setOpen(false);
              }}
            >
              {loc.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
