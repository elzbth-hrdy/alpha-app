"use client";

import React, { useState } from "react";
import styles from "./MatchedEnergyWidget.module.css";

type View = "good-energy" | "all-suppliers";

const VIEWS: { id: View; label: string; url: string }[] = [
  {
    id: "good-energy",
    label: "Good Energy mix",
    url: "https://matched.energy/clean-power-index/good-energy?nuclear=true&variant=portfolio",
  },
  {
    id: "all-suppliers",
    label: "All suppliers",
    url: "https://matched.energy/?r=false&s=all&rw=true&b=true&n=true",
  },
];

export function MatchedEnergyWidget() {
  const [active, setActive] = useState<View>("good-energy");

  const current = VIEWS.find((v) => v.id === active)!;

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} role="tablist" aria-label="Energy mix views">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={active === v.id}
            aria-controls={`panel-${v.id}`}
            className={[styles.tab, active === v.id ? styles.tabActive : ""].filter(Boolean).join(" ")}
            onClick={() => setActive(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-label={current.label}
        className={styles.panel}
      >
        <iframe
          key={current.url}
          src={current.url}
          title={current.label}
          className={styles.iframe}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className={styles.source}>
        Data from{" "}
        <a href="https://matched.energy" target="_blank" rel="noopener noreferrer">
          matched.energy
        </a>{" "}
        — half-hourly renewable matching using Elexon, NESO &amp; Ofgem public data.
      </p>
    </div>
  );
}
