import React from "react";
import styles from "./EnergyMetric.module.css";

/* ---------------------------------------------------------------------------
   StatCard — displays a single energy/cost metric.
   Used for: current usage (kWh), cost (£), carbon saved (kg CO₂), tariff rate.
   --------------------------------------------------------------------------- */

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  variant?: "default" | "yellow" | "dark" | "teal" | "green";
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  unit,
  trend,
  trendLabel,
  variant = "default",
  icon,
  className = "",
  ...props
}: StatCardProps) {
  return (
    <div
      className={[styles.statCard, styles[`stat-${variant}`], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className={styles.statTop}>
        <span className={styles.statLabel}>{label}</span>
        {icon && <span className={styles.statIcon} aria-hidden="true">{icon}</span>}
      </div>
      <div className={styles.statValue}>
        <span className={styles.statNumber}>{value}</span>
        {unit && <span className={styles.statUnit}>{unit}</span>}
      </div>
      {(trend || trendLabel) && (
        <div
          className={[
            styles.statTrend,
            trend ? styles[`trend-${trend}`] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={trendLabel}
        >
          {trend && trend !== "neutral" && (
            <TrendArrow direction={trend} />
          )}
          {trendLabel && (
            <span className={styles.trendLabel}>{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        transform: direction === "down" ? "rotate(180deg)" : undefined,
      }}
    >
      <path
        d="M6 2L11 8H1L6 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   EnergyGauge — circular gauge for live usage or solar generation.
   --------------------------------------------------------------------------- */

export interface EnergyGaugeProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function EnergyGauge({
  value,
  max,
  label,
  unit = "kWh",
  color = "var(--color-yellow)",
  size = "md",
}: EnergyGaugeProps) {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? clampedValue / max : 0;

  const sizes = { sm: 80, md: 120, lg: 160 };
  const diameter = sizes[size];
  const strokeWidth = size === "lg" ? 10 : size === "md" ? 8 : 6;
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage);

  const cx = diameter / 2;
  const cy = diameter / 2;

  return (
    <div className={styles.gauge} style={{ width: diameter, height: diameter }}>
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        role="img"
        aria-label={`${label}: ${value} ${unit} of ${max} ${unit}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--color-light-grey)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.8s var(--ease-out)" }}
        />
      </svg>
      <div className={styles.gaugeCenter}>
        <span className={styles.gaugeValue}>{value}</span>
        <span className={styles.gaugeUnit}>{unit}</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   EnergyFlowBar — horizontal bar showing import vs export split.
   --------------------------------------------------------------------------- */

export interface EnergyFlowBarProps {
  importKwh: number;
  exportKwh: number;
  solarKwh?: number;
}

export function EnergyFlowBar({
  importKwh,
  exportKwh,
  solarKwh = 0,
}: EnergyFlowBarProps) {
  const total = importKwh + exportKwh + solarKwh;
  const importPct = total > 0 ? (importKwh / total) * 100 : 0;
  const exportPct = total > 0 ? (exportKwh / total) * 100 : 0;
  const solarPct  = total > 0 ? (solarKwh / total) * 100 : 0;

  return (
    <div className={styles.flowBar}>
      <div className={styles.flowLegend}>
        {importKwh > 0 && (
          <div className={styles.flowLegendItem}>
            <span className={[styles.flowDot, styles.flowDotImport].join(" ")} />
            <span>Import</span>
            <strong>{importKwh} kWh</strong>
          </div>
        )}
        {solarKwh > 0 && (
          <div className={styles.flowLegendItem}>
            <span className={[styles.flowDot, styles.flowDotSolar].join(" ")} />
            <span>Generation</span>
            <strong>{solarKwh} kWh</strong>
          </div>
        )}
        {exportKwh > 0 && (
          <div className={styles.flowLegendItem}>
            <span className={[styles.flowDot, styles.flowDotExport].join(" ")} />
            <span>Export</span>
            <strong>{exportKwh} kWh</strong>
          </div>
        )}
      </div>
      <div
        className={styles.flowTrack}
        role="img"
        aria-label={`Energy split: ${importKwh} kWh imported, ${solarKwh} kWh generated, ${exportKwh} kWh exported`}
      >
        {importPct > 0 && (
          <div
            className={[styles.flowSegment, styles.flowSegmentImport].join(" ")}
            style={{ width: `${importPct}%` }}
          />
        )}
        {solarPct > 0 && (
          <div
            className={[styles.flowSegment, styles.flowSegmentSolar].join(" ")}
            style={{ width: `${solarPct}%` }}
          />
        )}
        {exportPct > 0 && (
          <div
            className={[styles.flowSegment, styles.flowSegmentExport].join(" ")}
            style={{ width: `${exportPct}%` }}
          />
        )}
      </div>
    </div>
  );
}
