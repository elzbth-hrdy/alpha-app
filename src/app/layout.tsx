import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/*
  Sharp Sans No.2 is the official Good Energy typeface (licensed).
  Place font files in /public/fonts/ and register via next/font/local when available.
  Plus Jakarta Sans is used here as the development placeholder — it closely
  matches the character and proportions of Sharp Sans No.2.
*/
const brandFont = Plus_Jakarta_Sans({
  variable: "--font-brand-loaded",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Good Energy",
  description:
    "Power a cleaner, greener future. Manage your energy import, export, and home renewables with Good Energy.",
  keywords: ["renewable energy", "solar panels", "heat pumps", "battery storage", "smart tariff"],
  openGraph: {
    title: "Good Energy",
    description: "Making it simple to generate, use and share clean energy.",
    siteName: "Good Energy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${brandFont.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
