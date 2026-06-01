import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Politica de confidențialitate Coderatti Studio. Cum colectăm, folosim și protejăm datele dumneavoastră personale.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://coderatti.studio/privacy",
  },
  openGraph: {
    title: "Politica de confidențialitate | Coderatti Studio",
    description:
      "Politica de confidențialitate Coderatti Studio. Cum colectăm, folosim și protejăm datele dumneavoastră personale.",
    url: "https://coderatti.studio/privacy",
    siteName: "Coderatti Studio",
    type: "article",
    locale: "ro_RO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coderatti Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politica de confidențialitate | Coderatti Studio",
    description:
      "Politica de confidențialitate Coderatti Studio. Cum colectăm, folosim și protejăm datele dumneavoastră personale.",
    images: ["/og-image.jpg"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
