"use client";

import { useState, useRef, type FormEvent, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import "./ContactModal.css";

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
    agreed: false,
  });

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.agreed) return;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert(t("contacts.success") || "Заявка отправлена! Мы свяжемся с вами.");
        setFormData({ name: "", contact: "", message: "", agreed: false });
        onClose();
      } else {
        alert(t("contacts.error") || "Ошибка при отправке. Попробуйте позже.");
      }
    } catch {
      alert(t("contacts.error") || "Ошибка при отправке. Попробуйте позже.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          className="modalBackdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <motion.div
            className="modalContent"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="modalClose" onClick={onClose}>
              ×
            </button>

            <h3>{t("modal.title")}</h3>

            <form className="modalForm" onSubmit={handleSubmit}>
              <div className="modalField">
                <label htmlFor="modal-name">{t("modal.name")}</label>
                <input
                  id="modal-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="modalField">
                <label htmlFor="modal-contact">{t("modal.contact")}</label>
                <input
                  id="modal-contact"
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

              <div className="modalField">
                <label htmlFor="modal-message">
                  {t("modal.message")}{" "}
                  <span style={{ opacity: 0.55 }}>({t("contacts.optional")})</span>
                </label>
                <textarea
                  id="modal-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>

              <label className="modalCheckbox">
                <input
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  required
                />
                <span>
                  {t("modal.privacy")}{" "}
                  <a href={`/privacy?lang=${locale}`} target="_blank" rel="noopener noreferrer">
                    {t("modal.privacyLink")}
                  </a>
                </span>
              </label>

              <button type="submit" className="modalSubmit">
                {t("modal.submit")}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
