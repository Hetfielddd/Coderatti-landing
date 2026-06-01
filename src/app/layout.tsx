import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://coderatti.studio"),
  title: {
    default: "Coderatti Studio — Web & Photo Studio",
    template: "%s | Coderatti Studio",
  },
  description:
    "Studio web și foto. Creează-ți propria vitrină online: landing page, magazine online, design digital și fotografie comercială.",
  keywords: [
    "web design",
    "fotografie",
    "studio web",
    "landing page",
    "magazin online",
    "design digital",
    "fotografie comercială",
    "Coderatti",
  ],
  authors: [{ name: "Coderatti Studio", url: "https://coderatti.studio" }],
  creator: "Coderatti Studio",
  publisher: "Coderatti Studio",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: ["en_US", "ru_RU"],
    url: "https://coderatti.studio",
    siteName: "Coderatti Studio",
    title: "Coderatti Studio — Web & Photo Studio",
    description:
      "Studio web și foto. Creează-ți propria vitrină online: landing page, magazine online, design digital și fotografie comercială.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coderatti Studio — Web & Photo Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coderatti Studio — Web & Photo Studio",
    description:
      "Studio web și foto. Creează-ți propria vitrină online: landing page, magazine online, design digital și fotografie comercială.",
    images: ["/og-image.jpg"],
    creator: "@coderatti",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://coderatti.studio",
    languages: {
      ro: "https://coderatti.studio",
      en: "https://coderatti.studio",
      ru: "https://coderatti.studio",
    },
  },
  verification: {
    google: undefined,
    yandex: undefined,
    other: {
      "trustpilot-one-time-domain-verification-id":
        "e8d9736e-3e18-4a78-9389-d28565eeb149",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="ro">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
