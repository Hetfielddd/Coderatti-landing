"use client";

import { useI18n } from "@/lib/i18n";
import LocaleSelector from "@/components/LocaleSelector";
import "./privacy.css";

export default function PrivacyPage() {
  const { tRaw } = useI18n();
  const paragraphs = tRaw("privacy.content") as string[];

  return (
    <main className="privacyPage">
      <div className="privacyContainer">
        <div className="privacyHeader">
          <h1>{tRaw("privacy.title") as string}</h1>
          <LocaleSelector />
        </div>
        <div className="privacyContent">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
