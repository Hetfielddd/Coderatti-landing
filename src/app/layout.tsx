import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coderatti Studio",
  description: "Studio web și foto",
  other: {
    "trustpilot-one-time-domain-verification-id": "e8d9736e-3e18-4a78-9389-d28565eeb149",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
