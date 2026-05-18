"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import LocaleSelector from "@/components/LocaleSelector";
import "./HeroSection.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <main className="hero">
      <section className="heroContent">
        <LocaleSelector />

        <div className="heroInner">
          <motion.p className="badge" {...fadeUp(0.1)}>
            {t("hero.badge")}
          </motion.p>
          <motion.h1 className="heroTitle" {...fadeUp(0.2)}>
            {t("hero.title")}{" "}
            <span className="typingText" aria-label={t("hero.typing")}>
              <span>S</span>
              <span>t</span>
              <span>u</span>
              <span>d</span>
              <span>i</span>
              <span>o</span>
              <span className="typingCursor">|</span>
            </span>
          </motion.h1>
          <motion.p className="subtitle" {...fadeUp(0.3)}>
            {t("hero.subtitle")}
          </motion.p>
        </div>

        <motion.section className="photoTemplate" aria-label="Hero photo" {...fadeUp(0.35)} />

        <motion.div className="ctaRow" {...fadeUp(0.45)}>
          <span className="arrow" />
          <a className="cta" href="mailto:hello@coderatti.studio">
            {t("hero.cta")}
          </a>
        </motion.div>

        <motion.nav className="heroNav" aria-label="Hero navigation" {...fadeUp(0.55)}>
          <a className="active" href="#portfolio">{t("hero.nav.portfolio")}</a>
          <a href="#prices">{t("hero.nav.services")}</a>
          <a href="#contacts">{t("hero.nav.contacts")}</a>
        </motion.nav>
      </section>
    </main>
  );
}
