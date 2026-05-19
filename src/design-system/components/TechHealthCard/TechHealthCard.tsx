import React from "react";
import type { InstalledTech, TechStatus, TechType } from "@/lib/mock-data";
import { EnergyGauge } from "@/design-system/components/EnergyMetric";
import { Badge } from "@/design-system/components/Badge";
import type { BadgeVariant } from "@/design-system/components/Badge";
import styles from "./TechHealthCard.module.css";

export interface TechHealthCardProps {
  tech: InstalledTech;
}

function healthColor(score: number): string {
  if (score >= 90) return "var(--color-green)";
  if (score >= 70) return "var(--color-yellow)";
  return "var(--color-error)";
}

function healthLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Needs attention";
}

const STATUS_BADGE: Record<TechStatus, BadgeVariant> = {
  active:   "success",
  idle:     "default",
  charging: "info",
  fault:    "error",
  offline:  "error",
};

export function TechHealthCard({ tech }: TechHealthCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.icon} aria-hidden="true">
          <TechIcon type={tech.type} />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{tech.name}</p>
          <Badge variant={STATUS_BADGE[tech.status]} className={styles.badge}>
            {tech.statusLabel}
          </Badge>
          <p className={styles.detail}>{tech.currentValueLabel}</p>
        </div>
      </div>

      <div className={styles.right}>
        <EnergyGauge
          value={tech.healthScore}
          max={100}
          label={`${tech.name} health`}
          unit="%"
          color={healthColor(tech.healthScore)}
          size="sm"
        />
        <p className={styles.healthLabel}>{healthLabel(tech.healthScore)}</p>
      </div>
    </div>
  );
}

function TechIcon({ type }: { type: TechType }) {
  switch (type) {
    case "solar":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "battery":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <rect x="5" y="10" width="6" height="4" rx="1" fill="currentColor" />
        </svg>
      );
    case "heatpump":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3C8.5 3 6 6 6 9c0 4 6 12 6 12s6-8 6-12c0-3-2.5-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "ev":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="7" width="20" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 7V5.5A.5.5 0 017.5 5h2a.5.5 0 01.5.5V7M14 7V5.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12.5 10.5L10.5 13.5h4l-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
