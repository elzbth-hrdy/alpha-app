"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TopNav, BottomTabBar } from "@/design-system/components/Navigation";
import styles from "./AppShell.module.css";

const NAV_ITEMS_BASE = [
  { label: "Dashboard", href: "/",         icon: <HomeIcon /> },
  { label: "EV",        href: "/ev",        icon: <EVIcon /> },
  { label: "History",   href: "/history",   icon: <ChartIcon /> },
  { label: "Insights",  href: "/insights",  icon: <InsightsIcon /> },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = NAV_ITEMS_BASE.map((item) => ({
    ...item,
    active: item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href),
  }));

  const logo = (
    <Image src="/Logo.Secondary.RGB.svg" alt="Good Energy" width={160} height={43} priority />
  );

  return (
    <>
      <TopNav items={navItems} logo={logo} />
      <div className={styles.alphaBanner} role="banner" aria-label="Alpha notice">
        <div className={styles.alphaBannerInner}>
          <InfoIcon />
          <span>Alpha experience — features and data are for testing only and may not reflect your real account.</span>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
      <BottomTabBar items={navItems} />
    </>
  );
}

/* ---------------------------------------------------------------------------
   Nav icons
   --------------------------------------------------------------------------- */

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 18V13h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function EVIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 6V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V6M12 6V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 9.5L8.5 12.5h3L9.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8.5" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="3" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function InsightsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="9" x2="10" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="7" r="0.875" fill="currentColor" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="8" y1="7" x2="8" y2="11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="5.5" r="0.7" fill="currentColor" />
    </svg>
  );
}
