"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// TooltipProps — recharts v3 uses a different shape; we use a looser type here
type TooltipPayloadItem = { name: string; value: number; color: string; dataKey?: string };
interface CustomTooltipArgs {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  period: Period;
}
import type { Period } from "@/design-system/components/PeriodSelector";
import type { DailyPoint, HourlyPoint } from "@/lib/mock-data";
import styles from "./TimeSeriesChart.module.css";

export type ChartSeries = "import" | "solar" | "export";

export interface TimeSeriesChartProps {
  data: (DailyPoint | HourlyPoint)[];
  period: Period;
  series?: ChartSeries[];
  height?: number;
  showBars?: boolean;
}

const SERIES_CONFIG: Record<
  ChartSeries,
  { label: string; color: string; dataKey: string }
> = {
  import: { label: "Import",      color: "#FFDC14", dataKey: "importKwh" },
  solar:  { label: "Generation",  color: "#00B889", dataKey: "solarKwh"  },
  export: { label: "Export",      color: "#009BBF", dataKey: "exportKwh" },
};

function xFormatter(period: Period) {
  return (value: string | number) => {
    if (period === "day") {
      const h = Number(value);
      return `${String(h).padStart(2, "0")}:00`;
    }
    if (typeof value === "string") {
      const d = new Date(value + "T00:00:00");
      if (period === "year") {
        return d.toLocaleString("en-GB", { month: "short" });
      }
      return d.toLocaleString("en-GB", { day: "numeric", month: "short" });
    }
    return String(value);
  };
}

function xKey(period: Period): string {
  return period === "day" ? "hour" : "date";
}

// Custom tooltip
function CustomTooltip({ active, payload, label, period }: CustomTooltipArgs) {
  if (!active || !payload?.length) return null;

  let displayLabel = String(label);
  if (period === "day") {
    const h = Number(label);
    displayLabel = `${String(h).padStart(2, "0")}:00–${String(h + 1).padStart(2, "0")}:00`;
  } else if (typeof label === "string") {
    const d = new Date(label + "T00:00:00");
    displayLabel = d.toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  }

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{displayLabel}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: entry.color }} />
          <span className={styles.tooltipName}>{entry.name}</span>
          <span className={styles.tooltipValue}>{Number(entry.value).toFixed(2)} kWh</span>
        </div>
      ))}
    </div>
  );
}

// Custom legend
function CustomLegend({ seriesList }: { seriesList: ChartSeries[] }) {
  return (
    <div className={styles.legend}>
      {seriesList.map((s) => (
        <div key={s} className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: SERIES_CONFIG[s].color }} />
          <span className={styles.legendLabel}>{SERIES_CONFIG[s].label}</span>
        </div>
      ))}
    </div>
  );
}

export function TimeSeriesChart({
  data,
  period,
  series = ["import", "solar", "export"],
  height = 280,
  showBars = false,
}: TimeSeriesChartProps) {
  const useBars = showBars || period === "month" || period === "year";
  const tickStyle = {
    fontFamily: "var(--font-brand, Arial)",
    fontSize: 11,
    fontWeight: 600,
    fill: "#8B8784",
  };

  return (
    <div className={styles.wrapper}>
      <CustomLegend seriesList={series} />
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -16 }}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E1E1E1"
            vertical={false}
          />
          <XAxis
            dataKey={xKey(period)}
            tickFormatter={xFormatter(period)}
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
            unit=" kWh"
            width={56}
          />
          <Tooltip
            content={(props) => (
              <CustomTooltip {...(props as unknown as CustomTooltipArgs)} period={period} />
            )}
          />
          {series.map((s) => {
            const cfg = SERIES_CONFIG[s];
            if (useBars) {
              return (
                <Bar
                  key={s}
                  dataKey={cfg.dataKey}
                  name={cfg.label}
                  fill={cfg.color}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={32}
                />
              );
            }
            return (
              <Area
                key={s}
                type="monotone"
                dataKey={cfg.dataKey}
                name={cfg.label}
                stroke={cfg.color}
                strokeWidth={2}
                fill={cfg.color + "18"}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
