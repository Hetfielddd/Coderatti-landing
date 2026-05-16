import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coderatti Studio",
  description: "Studio web și foto",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
