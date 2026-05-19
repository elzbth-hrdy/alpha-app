"use client";

import React from "react";
import styles from "./PeriodSelector.module.css";

export type Period = "day" | "week" | "month" | "year";

const PERIOD_LABELS: Record<Period, string> = {
  day:   "Day",
  week:  "Week",
  month: "Month",
  year:  "Year",
};

export interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
  periods?: Period[];
}

export function PeriodSelector({
  value,
  onChange,
  periods = ["day", "week", "month", "year"],
}: PeriodSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent, period: Period) => {
    const idx = periods.indexOf(period);
    if (e.key === "ArrowRight" && idx < periods.length - 1) {
      onChange(periods[idx + 1]);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      onChange(periods[idx - 1]);
    }
  };

  return (
    <div className={styles.wrapper} role="tablist" aria-label="Select time period">
      {periods.map((period) => (
        <button
          key={period}
          role="tab"
          aria-selected={period === value}
          className={[
            styles.tab,
            period === value ? styles.tabActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onChange(period)}
          onKeyDown={(e) => handleKeyDown(e, period)}
          type="button"
        >
          {PERIOD_LABELS[period]}
        </button>
      ))}
    </div>
  );
}
