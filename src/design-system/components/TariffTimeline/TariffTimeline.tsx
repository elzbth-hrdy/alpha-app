import React from "react";
import type { TariffPeriod, TariffRate } from "@/lib/mock-data";
import styles from "./TariffTimeline.module.css";

export interface TariffTimelineProps {
  periods: TariffPeriod[];
  currentHour?: number;
  showLegend?: boolean;
}

const RATE_LABELS: Record<TariffRate, string> = {
  cheap:    "Off-peak",
  standard: "Standard",
  peak:     "Peak",
};

export function TariffTimeline({
  periods,
  currentHour,
  showLegend = true,
}: TariffTimelineProps) {
  const TOTAL_HOURS = 24;

  const ariaDesc = periods
    .map((p) => `${p.label} ${p.pencePerKwh}p/kWh from ${p.startHour}:00 to ${p.endHour}:00`)
    .join("; ");

  const nowPct =
    currentHour !== undefined
      ? ((currentHour / TOTAL_HOURS) * 100).toFixed(2)
      : null;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.track}
        role="img"
        aria-label={`Today's tariff rates: ${ariaDesc}`}
      >
        {periods.map((period, i) => {
          const widthPct = ((period.endHour - period.startHour) / TOTAL_HOURS) * 100;
          return (
            <div
              key={i}
              className={[styles.band, styles[period.rate]].join(" ")}
              style={{ width: `${widthPct}%` }}
              title={`${period.label} — ${period.pencePerKwh}p/kWh`}
            >
              <span className={styles.bandLabel}>
                {period.pencePerKwh}p
              </span>
            </div>
          );
        })}

        {/* Hour ticks */}
        {[6, 12, 18].map((h) => (
          <div
            key={h}
            className={styles.tick}
            style={{ left: `${(h / TOTAL_HOURS) * 100}%` }}
            aria-hidden="true"
          />
        ))}

        {/* Now indicator */}
        {nowPct !== null && (
          <div
            className={styles.nowLine}
            style={{ left: `${nowPct}%` }}
            aria-label={`Current time: ${currentHour}:00`}
          />
        )}
      </div>

      {/* Hour labels */}
      <div className={styles.hourLabels} aria-hidden="true">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>

      {showLegend && (
        <div className={styles.legend} aria-hidden="true">
          {(["cheap", "standard", "peak"] as TariffRate[]).map((rate) => {
            const period = periods.find((p) => p.rate === rate);
            if (!period) return null;
            return (
              <div key={rate} className={styles.legendItem}>
                <span className={[styles.legendDot, styles[rate]].join(" ")} />
                <span className={styles.legendText}>
                  {RATE_LABELS[rate]} — {period.pencePerKwh}p/kWh
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
