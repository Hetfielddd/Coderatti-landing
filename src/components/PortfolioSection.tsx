"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import "./PortfolioSection.css";
import PortfolioDetailModal from "./PortfolioDetailModal";

type PortfolioCase = {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  caseDescription?: string;
  scopeLabel?: string;
  url?: string;
  image: string;
  tags: string[];
  scope: string[];
  ctaLabel?: string;
  noLink?: boolean;
};

export default function PortfolioSection({ onOpenModal }: { onOpenModal: () => void }) {
  const { t, tRaw } = useI18n();
  const portfolioCases = tRaw("portfolio.cases") as PortfolioCase[];

  const [activeIndex, setActiveIndex] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailCase, setDetailCase] = useState<PortfolioCase | null>(null);
  const touchStartX = useRef<number | null>(null);
  const activeCase = portfolioCases[activeIndex] ?? portfolioCases[0];

  const openDetailModal = (item: PortfolioCase) => {
    setDetailCase(item);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
  };

  const prev = () => setActiveIndex((current) => (current === 0 ? portfolioCases.length - 1 : current - 1));
  const next = () => setActiveIndex((current) => (current === portfolioCases.length - 1 ? 0 : current + 1));

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) > 42) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="portfolioSection" id="portfolio">
      <div className="portfolioContainer">
        <div className="portfolioHeader">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>{t("portfolio.title")}</h2>
          </motion.div>
          <motion.p
            className="portfolioIntro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("portfolio.intro")}
          </motion.p>
        </div>

        <div className="portfolioTabs">
          {portfolioCases.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={activeIndex === index ? "active" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{item.number}</span>
              <span>{item.category}</span>
            </motion.button>
          ))}
        </div>

        <div className="portfolioBody">
          <div className="portfolioSlider" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="portfolioTrack" style={{ transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 20}px))` }}>
              {portfolioCases.map((item, index) => (
                <article key={item.id} className={activeIndex === index ? "portfolioSlide active" : "portfolioSlide"}>
                  <div onClick={() => setActiveIndex(index)} className="portfolioCard">
                    <div className="portfolioCardInfo">
                      <button
                        type="button"
                        className="portfolioDetailBtn"
                        onClick={(event) => {
                          event.stopPropagation();
                          openDetailModal(item);
                        }}
                      >
                        {t("portfolio.detailBtn")}
                      </button>
                      <div>
                        <p className="portfolioNumber">{item.number}</p>
                        <p className="portfolioCategory">{item.category}</p>
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                      </div>
                      <div className="portfolioMobileControls">
                        <span>{activeCase.number} / {portfolioCases.length.toString().padStart(2, "0")}</span>
                        <div>
                          <button type="button" onClick={(event) => { event.stopPropagation(); prev(); }} aria-label="Previous case">←</button>
                          <button type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next case">→</button>
                        </div>
                      </div>
                    </div>
                    <ProjectVisual item={item} active={activeIndex === index} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <motion.aside
            className="portfolioAside"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="portfolioAsideTop">
                <span>{activeCase.number} / {portfolioCases.length.toString().padStart(2, "0")}</span>
                <div>
                  <button type="button" onClick={prev} aria-label="Previous case">←</button>
                  <button type="button" onClick={next} aria-label="Next case">→</button>
                </div>
              </div>
              <p className="portfolioAsideLabel">{activeCase.caseDescription || t("portfolio.caseDescription")}</p>
              <p className="portfolioDescription">{activeCase.description}</p>
              <div className="portfolioTags">
                {activeCase.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="portfolioScope">
                <p>{activeCase.scopeLabel || t("portfolio.scope")}</p>
                {activeCase.scope.map((item) => (
                  <div key={item}>
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {activeCase.url ? (
              <a className="portfolioProjectLink" href={activeCase.url} target="_blank" rel="noopener noreferrer">{t("portfolio.viewProject")}</a>
            ) : (
              <button type="button" className="portfolioProjectLink" onClick={onOpenModal}>
                {activeCase.ctaLabel || t("portfolio.requestShoot")}
              </button>
            )}
          </motion.aside>
        </div>
      </div>

      <PortfolioDetailModal
        isOpen={detailModalOpen}
        onClose={closeDetailModal}
        onContact={() => {
          closeDetailModal();
          onOpenModal();
        }}
        case={detailCase}
      />
    </section>
  );
}

function ProjectVisual({ item, active }: { item: PortfolioCase; active: boolean }) {
  const { t } = useI18n();
  return (
    <div className="portfolioVisual">
      <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 58vw, 94vw" className={active ? "active" : ""} />
      <div className="portfolioVisualOverlay" />
      <div className="portfolioVisualCaption">
        <div>
          {item.url && <p>{t("portfolio.preview")}</p>}
          <p>{item.category}</p>
        </div>
        {item.url ? (
          <a href={item.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>{t("portfolio.open")}</a>
        ) : !item.noLink ? (
          <span>{t("portfolio.view")}</span>
        ) : null}
      </div>
    </div>
  );
}
