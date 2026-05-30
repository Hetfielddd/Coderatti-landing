# Session Log — 2026-05-23

## 1. Проблема: `backdrop-filter: blur()` не работал в dev-режиме

**Причина:** Next.js `16.2.6` имеет regression в dev-режиме — `backdrop-filter` полностью игнорируется браузером.
**Решение:** Downgrade до `15.1.11` (проверено на `coderatti_web`, где blur работал).
**Файлы:** `package.json`, `package-lock.json`

## 2. Замена шрифта: Bounded → Inter

**Причина:** В Bounded при малых размерах (14–16px) строчные `c`, `e`, `a` выглядели как `o` из-за узких апертур.
**Решение:** Загружен variable-шрифт `Inter`. `Bezier Sans` оставлен только для заголовков секций.
**Файлы:** `public/fonts/Inter-VariableFont_opsz,wght.ttf`, `src/app/globals.css`

## 3. Исправление текста 4-го баннера (Digital Design)

Убрано упоминание логотипа / брендинга:
- RO: `Crearea partei vizuale pentru afaceri`
- EN: `Creating visual part for businesses`
- RU: `Создание визуальной части для бизнеса`
**Файлы:** `messages/ro.json`, `messages/en.json`, `messages/ru.json`

## 4. Создание копии под рынок РФ — `coderatti_ru`

**Путь:** `d:\CascadeProjects\coderatti_ru`

### Что изменено:
- Удалена вся i18n-система (`useI18n`, `I18nProvider`, `LocaleSelector`, папка `messages`)
- Все тексты захардкожены на русском
- Из портфолио убран 3-й баннер (`food-photo`). Остались:
  1. Amore Sushi (интернет-магазин)
  2. Kasha Brow Studio (лендинг)
  3. Digital Design (цифровой дизайн)
- Цены в рублях:
  - Лендинг — **15 000 ₽**
  - Интернет-магазин — **от 30 000 ₽**
  - Цифровой дизайн — **от 10 000 ₽**
  - Предметная съёмка — **1 500 ₽ / час**

### Затронутые файлы в `coderatti_ru`:
- `src/app/layout.tsx` — убран `I18nProvider`
- `src/app/privacy/page.tsx` — хардкод русского текста, убран `LocaleSelector`
- `src/components/HeroSection.tsx` — хардкод русского текста, убран `LocaleSelector`
- `src/components/PortfolioSection.tsx` — хардкод + убран 3-й баннер
- `src/components/PriceListSection.tsx` — хардкод + цены в ₽
- `src/components/ContactSection.tsx` — хардкод русского текста
- `src/components/ContactModal.tsx` — хардкод русского текста
- Удалены: `src/lib/i18n.tsx`, `src/components/LocaleSelector.tsx`, `src/components/LocaleSelector.css`, `messages/*`

## 5. Известные warning'и (не критичны)

- `autoprefixer: end value has mixed support, consider using flex-end instead` в `PortfolioSection.css:214`
- ESLint: `react-hooks/set-state-in-effect` в `src/lib/i18n.tsx:36` (только в основном проекте, в `coderatti_ru` удалён)

## 6. Команды для запуска

```bash
# Основной проект (мультиязычный)
cd d:\CascadeProjects\coderatti
npm run dev

# РФ-версия (только русский)
cd d:\CascadeProjects\coderatti_ru
npm run dev
```

## 7. Если сломается кэш Webpack

```bash
rm -rf .next && npm run dev
```
