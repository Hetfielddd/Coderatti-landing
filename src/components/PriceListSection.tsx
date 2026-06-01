"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import "./PriceListSection.css";

type PriceItem = {
  title: string;
  description: string;
  audience: string[];
  price: string;
  audienceLabel?: string;
};

function PriceCard({ item, index }: { item: PriceItem; index: number }) {
  const { t } = useI18n();
  return (
    <motion.article
      className="priceCard"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="priceAudience">
          <p>{item.audienceLabel || t("prices.targetAudience")}</p>
          <ul>
            {item.audience.map((audienceItem) => (
              <li key={audienceItem}>{audienceItem}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="priceCardBottom">
        <a href="mailto:hello@coderatti.studio">{t("prices.contact")}</a>
        <motion.span whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          {item.price}
        </motion.span>
      </div>
    </motion.article>
  );
}

export default function PriceListSection() {
  const { t, tRaw } = useI18n();
  const priceItems = tRaw("prices.items") as PriceItem[];

  return (
    <section className="priceSection" id="prices">
      <div className="priceGlow priceGlowGreen" />
      <div className="priceGlow priceGlowWhite" />
      <div className="priceDecor priceDecorLeft" />
      <div className="priceDecor priceDecorRight" />

      <div className="priceContainer">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("prices.title")}
        </motion.h2>

        <div className="priceGrid">
          <div className="priceColumn">
            <PriceCard item={priceItems[0]} index={0} />
            <PriceCard item={priceItems[2]} index={2} />
          </div>
          <div className="priceColumn">
            <PriceCard item={priceItems[1]} index={1} />
            <PriceCard item={priceItems[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
