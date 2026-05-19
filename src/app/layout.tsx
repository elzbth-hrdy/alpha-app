import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

/*
  Sharp Sans No.2 is the official Good Energy typeface (licensed).
  Place font files in /public/fonts/ and register via next/font/local when available.
  Plus Jakarta Sans is used here as the development placeholder.
*/
const brandFont = Plus_Jakarta_Sans({
  variable: "--font-brand-loaded",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Good Energy Alpha",
  description:
    "Early access to Good Energy's next-generation energy management tools. For technically-minded customers.",
  keywords: ["renewable energy", "solar panels", "heat pumps", "battery storage", "EV charging", "smart tariff"],
  openGraph: {
    title: "Good Energy Alpha",
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
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
