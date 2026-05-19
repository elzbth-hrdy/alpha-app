"use client";

import React, { useState } from "react";
import styles from "./Navigation.module.css";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface TopNavProps {
  items?: NavItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

export function TopNav({ items = [], logo, actions }: TopNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.topNav}>
      <div className={styles.topNavInner}>
        <div className={styles.topNavBrand}>
          {logo ?? <GoodEnergyLogoPlaceholder />}
        </div>

        {/* Desktop nav */}
        <nav
          className={styles.desktopNav}
          aria-label="Main navigation"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                styles.navLink,
                item.active ? styles.navLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.topNavActions}>
          {actions}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        className={[styles.mobileNav, open ? styles.mobileNavOpen : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={[
              styles.mobileNavLink,
              item.active ? styles.mobileNavLinkActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={item.active ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.icon && (
              <span className={styles.mobileNavIcon} aria-hidden="true">
                {item.icon}
              </span>
            )}
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ---------------------------------------------------------------------------
   BottomTabBar — mobile app-style bottom navigation
   --------------------------------------------------------------------------- */

export interface BottomTabBarProps {
  items: NavItem[];
}

export function BottomTabBar({ items }: BottomTabBarProps) {
  return (
    <nav
      className={styles.bottomTabBar}
      aria-label="App navigation"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={[
            styles.tabItem,
            item.active ? styles.tabItemActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={item.active ? "page" : undefined}
        >
          {item.icon && (
            <span className={styles.tabIcon} aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className={styles.tabLabel}>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

/* ---------------------------------------------------------------------------
   Inline SVG icons
   --------------------------------------------------------------------------- */

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GoodEnergyLogoPlaceholder() {
  return (
    <div className={styles.logoPlaceholder} aria-label="Good Energy">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="16" fill="#FFDC14" />
        <path
          d="M16 8C11.582 8 8 11.582 8 16s3.582 8 8 8c2.4 0 4.556-1.06 6.04-2.74"
          stroke="#020000"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M22 11l-3 5h4l-4 7"
          stroke="#020000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Good Energy</span>
    </div>
  );
}
