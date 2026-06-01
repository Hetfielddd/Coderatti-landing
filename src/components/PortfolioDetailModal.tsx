"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useRef, type MouseEvent } from "react";
import "./PortfolioDetailModal.css";

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
};

export default function PortfolioDetailModal({
  isOpen,
  onClose,
  onContact,
  case: portfolioCase,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
  case: PortfolioCase | null;
}) {
  const { t } = useI18n();
  const backdropRef = useRef<HTMLDivElement>(null);
  const mouseDownTarget = useRef<EventTarget | null>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouseDownTarget.current = e.target;
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (
      e.target === backdropRef.current &&
      mouseDownTarget.current === backdropRef.current
    ) {
      onClose();
    }
    mouseDownTarget.current = null;
  };

  if (!portfolioCase) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          className="portfolioModalBackdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <motion.div
            className="portfolioModalContent"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="portfolioModalClose" onClick={onClose}>
              ×
            </button>

            <h3>{portfolioCase.number} — {portfolioCase.title}</h3>

            <p className="portfolioDetailLabel">{portfolioCase.caseDescription || t("portfolio.caseDescription")}</p>
            <p className="portfolioDetailDescription">{portfolioCase.description}</p>

            <div className="portfolioDetailTags">
              {portfolioCase.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="portfolioDetailScope">
              <p>{portfolioCase.scopeLabel || t("portfolio.scope")}</p>
              {portfolioCase.scope.map((item) => (
                <div key={item}>
                  <span />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <button type="button" className="portfolioDetailContactBtn" onClick={onContact}>
              {t("contacts.submit")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
