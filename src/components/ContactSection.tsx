"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useState, type FormEvent } from "react";
import "./ContactSection.css";

export default function ContactSection() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Cerere nouă de la ${formData.name}`);
    const body = encodeURIComponent(
      `Nume: ${formData.name}\nContact: ${formData.contact}\n\nMesaj:\n${formData.message}`
    );
    window.location.href = `mailto:hello@coderatti.studio?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contactSection" id="contacts">
      <div className="contactContainer">
        <motion.div
          className="contactPhoto"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/contact-photo.jpg"
            alt="Echipa Coderatti Studio"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="contactPhotoImg"
            priority
          />
        </motion.div>

        <div className="contactContent">
          <motion.div
            className="contactHeader"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>{t("contacts.title")}</h2>
            <p>{t("contacts.subtitle")}</p>
          </motion.div>

          <motion.div
            className="contactSocials"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="contactLabel">{t("contacts.socials")}</p>
            <div className="contactSocialButtons">
              <a
                href="https://t.me/coderatti"
                target="_blank"
                rel="noopener noreferrer"
                className="contactSocialBtn"
              >
                {t("contacts.telegram")}
              </a>
              <a
                href="https://instagram.com/coderatti"
                target="_blank"
                rel="noopener noreferrer"
                className="contactSocialBtn"
              >
                {t("contacts.instagram")}
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contactForm"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="contactLabel">{t("contacts.sendRequest")}</p>

            <motion.div
              className="contactField"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <label className="contactFieldLabel" htmlFor="contact-name">{t("contacts.name")}</label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="contactField"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <label className="contactFieldLabel" htmlFor="contact-info">{t("contacts.address")}</label>
              <input
                id="contact-info"
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="contactField contactFieldArea"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <textarea
                placeholder={t("contacts.message")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </motion.div>

            <motion.p
              className="contactOptional"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("contacts.optional")}
            </motion.p>

            <motion.button
              type="submit"
              className="contactSubmit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("contacts.submit")}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
