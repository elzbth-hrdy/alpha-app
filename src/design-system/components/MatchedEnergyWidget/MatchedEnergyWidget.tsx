"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { matchedEnergyData } from "@/lib/mock-data";
import styles from "./MatchedEnergyWidget.module.css";

type ChartView = "monthly" | "suppliers";

const TICK_STYLE = {
  fontFamily: "var(--font-brand, Arial)",
  fontSize: 11,
  fontWeight: 600,
  fill: "#8B8784",
};

const TECH_ITEMS = [
  { key: "windOffshore" as const, label: "Offshore wind", color: "#009BBF" },
  { key: "windOnshore"  as const, label: "Onshore wind",  color: "#006B8F" },
  { key: "solar"        as const, label: "Solar",         color: "#FFDC14" },
  { key: "hydro"        as const, label: "Hydro",         color: "#4A90D9" },
  { key: "biomass"      as const, label: "Biomass",       color: "#00B889" },
];

function monthlyBarColor(score: number): string {
  if (score >= 0.8) return "#00B889";
  if (score >= 0.6) return "#FFDC14";
  return "#EF4444";
}

export function MatchedEnergyWidget() {
  const [view, setView] = useState<ChartView>("monthly");
  const d = matchedEnergyData;
  const pct = Math.round(d.halfHourlyScore * 100);
  const gap = 100 - pct;

  return (
    <div className={styles.wrapper}>

      {/* ── Headline ───────────────────────────────────────────────────── */}
      <div className={styles.headline}>
        <div className={styles.scoreBlock}>
          <span className={styles.scoreBig}>{pct}%</span>
          <span className={styles.scoreUnit}>half-hourly matched</span>
          <span className={styles.scoreRank}>#{d.rank} of {d.totalSuppliers} UK suppliers</span>
        </div>

        <div className={styles.scoreExplainer}>
          <p className={styles.explainerText}>
            For <strong>{pct}%</strong> of every half-hour, Good Energy&apos;s contracted
            renewables were actually generating at the same moment customers used electricity.
            The remaining <strong>{gap}%</strong> — mostly winter evenings — still relies on
            the wider grid mix.
          </p>
          <p className={styles.explainerText}>
            Unlike annual &ldquo;100% renewable&rdquo; claims, this score can&apos;t offset
            summer solar against winter gas. It&apos;s the most accurate measure of how green
            your supply really is.
          </p>
        </div>
      </div>

      {/* ── Technology mix ─────────────────────────────────────────────── */}
      <div className={styles.mixSection}>
        <h3 className={styles.sectionLabel}>Generation mix</h3>
        <div
          className={styles.mixBar}
          role="img"
          aria-label={TECH_ITEMS.map(t =>
            `${t.label}: ${Math.round(d.techMix[t.key] * 100)}%`
          ).join(", ")}
        >
          {TECH_ITEMS.map((t) => (
            <div
              key={t.key}
              className={styles.mixSegment}
              style={{ width: `${d.techMix[t.key] * 100}%`, background: t.color }}
            />
          ))}
        </div>
        <div className={styles.mixLegend}>
          {TECH_ITEMS.map((t) => (
            <div key={t.key} className={styles.mixItem}>
              <span className={styles.mixDot} style={{ background: t.color }} />
              <span className={styles.mixLabel}>{t.label}</span>
              <strong className={styles.mixPct}>
                {Math.round(d.techMix[t.key] * 100)}%
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* ── Charts ─────────────────────────────────────────────────────── */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTabs} role="tablist">
            {(["monthly", "suppliers"] as ChartView[]).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                className={[styles.chartTab, view === v ? styles.chartTabActive : ""].filter(Boolean).join(" ")}
                onClick={() => setView(v)}
              >
                {v === "monthly" ? "Monthly scores" : "Supplier ranking"}
              </button>
            ))}
          </div>
        </div>

        {view === "monthly" && (
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={d.monthlyScores}
                margin={{ top: 4, right: 8, bottom: 0, left: -20 }}
              >
                <XAxis
                  dataKey="month"
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v: unknown) => [`${Math.round((v as number) * 100)}%`, "Matched"]}
                  contentStyle={{
                    background: "#020000",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  cursor={{ fill: "rgb(0 0 0 / 0.04)" }}
                />
                <Bar dataKey="score" radius={[3, 3, 0, 0]} maxBarSize={36}>
                  {d.monthlyScores.map((m, i) => (
                    <Cell key={i} fill={monthlyBarColor(m.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className={styles.chartLegend}>
              <span className={styles.legendChip} style={{ background: "#00B889" }}>≥80%</span>
              <span className={styles.legendChip} style={{ background: "#FFDC14", color: "#020000" }}>60–79%</span>
              <span className={styles.legendChip} style={{ background: "#EF4444" }}>{"<60%"}</span>
            </div>
          </div>
        )}

        {view === "suppliers" && (
          <div className={styles.chartWrap}>
            <ResponsiveContainer
              width="100%"
              height={d.supplierRankings.length * 34 + 24}
            >
              <BarChart
                data={d.supplierRankings}
                layout="vertical"
                margin={{ top: 4, right: 48, bottom: 0, left: 8 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 1]}
                  tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ ...TICK_STYLE, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
                <Tooltip
                  formatter={(v: unknown) => [`${Math.round((v as number) * 100)}%`, "Matched score"]}
                  contentStyle={{
                    background: "#020000",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  cursor={{ fill: "rgb(0 0 0 / 0.04)" }}
                />
                <Bar dataKey="score" radius={[0, 3, 3, 0]} maxBarSize={24}>
                  {d.supplierRankings.map((s, i) => (
                    <Cell
                      key={i}
                      fill={s.isUs ? "#00B889" : "#D4D2D0"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className={styles.rankNote}>
              Supplier scores are approximate, sourced from the public matched.energy index.
            </p>
          </div>
        )}
      </div>

      {/* ── Attribution ────────────────────────────────────────────────── */}
      <p className={styles.attribution}>
        {d.compliancePeriod} · Updated {d.lastUpdated} · Scores at portfolio level ·{" "}
        Data:{" "}
        <a href="https://matched.energy" target="_blank" rel="noopener noreferrer">
          Matched Energy
        </a>{" "}
        (CC BY-NC-4.0)
      </p>

    </div>
  );
}
