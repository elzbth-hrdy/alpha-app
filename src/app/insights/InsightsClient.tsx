"use client";

import React, { useState } from "react";
import { TechHealthCard } from "@/design-system/components/TechHealthCard";
import { InsightCard } from "@/design-system/components/InsightCard";
import { TimeSeriesChart } from "@/design-system/components/TimeSeriesChart";
import { PeriodSelector } from "@/design-system/components/PeriodSelector";
import { Card, CardBody, CardHeader } from "@/design-system/components/Card";
import { Heading, Body, Caption } from "@/design-system/components/Typography";
import { Badge } from "@/design-system/components/Badge";
import {
  installedTech,
  insights,
  yoySolar,
  localBenchmarks,
} from "@/lib/mock-data";
import styles from "./page.module.css";

// Transform YoY data into a chart-compatible shape
function yoyChartData() {
  return yoySolar.map((row) => ({
    date: row.month,
    solarKwh: row.thisYearKwh,
    solarKwhLastYear: row.lastYearKwh,
    importKwh: 0,
    exportKwh: 0,
    homeKwh: 0,
    costPence: 0,
    earningsPence: 0,
  }));
}

export function InsightsClient() {
  const [yoyPeriod] = useState<"year">("year");

  const comparisons = insights.filter((i) => i.type === "comparison");
  const savings     = insights.filter((i) => i.type === "saving");
  const tips        = insights.filter((i) => i.type === "tip");
  const health      = insights.filter((i) => i.type === "health");

  return (
    <div className={styles.container}>

      <div className={styles.pageTitle}>
        <Heading as="h1" level="h1">Insights</Heading>
      </div>

      {/* Technology health */}
      <section>
        <Heading level="h2" className={styles.sectionHeading}>Technology health</Heading>
        <div className={styles.techGrid}>
          {installedTech.map((tech) => (
            <TechHealthCard key={tech.id} tech={tech} />
          ))}
        </div>
        {health.map((insight) => (
          <div key={insight.id} className={styles.healthInsight}>
            <InsightCard insight={insight} />
          </div>
        ))}
      </section>

      {/* Year on year */}
      <section>
        <div className={styles.yoyHeader}>
          <Heading level="h2">Year on year</Heading>
          <Badge variant="warning">Beta</Badge>
        </div>
        <Body size="sm" className={styles.yoySubtitle}>
          Monthly solar generation — this year vs last year (kWh)
        </Body>
        <Card>
          <CardBody>
            <TimeSeriesChart
              data={yoyChartData()}
              period={yoyPeriod}
              series={["solar"]}
              height={240}
              showBars
            />
          </CardBody>
        </Card>
        <div className={styles.yoyLegend}>
          <span className={[styles.yoyDot, styles.yoyDotThis].join(" ")} aria-hidden="true" />
          <Caption>This year</Caption>
          <span className={[styles.yoyDot, styles.yoyDotLast].join(" ")} aria-hidden="true" />
          <Caption>Last year</Caption>
        </div>
        <div className={styles.yoyTable}>
          <table className={styles.compTable}>
            <thead>
              <tr>
                <th>Month</th>
                <th>This year</th>
                <th>Last year</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {yoySolar.map((row) => {
                const diff = row.thisYearKwh - row.lastYearKwh;
                const pct = ((diff / row.lastYearKwh) * 100).toFixed(0);
                const positive = diff >= 0;
                return (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{row.thisYearKwh} kWh</td>
                    <td className={styles.lastYearCell}>{row.lastYearKwh} kWh</td>
                    <td className={positive ? styles.posChange : styles.negChange}>
                      {positive ? "+" : ""}{pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* How you compare */}
      <section>
        <Heading level="h2" className={styles.sectionHeading}>How you compare</Heading>
        <div className={styles.benchmarkGrid}>
          {localBenchmarks.map((bench) => (
            <div key={bench.metric} className={styles.benchmarkCard}>
              <div className={styles.benchmarkHeader}>
                <span className={styles.benchmarkMetric}>{bench.metric}</span>
                <Badge variant="success">+{bench.betterByPercent}%</Badge>
              </div>
              <div className={styles.benchmarkValues}>
                <div className={styles.benchmarkValue}>
                  <span className={styles.benchmarkValueNum}>{bench.yourValue}</span>
                  <Caption className={styles.benchmarkValueLabel}>You</Caption>
                </div>
                <div className={styles.benchmarkDivider} aria-hidden="true" />
                <div className={styles.benchmarkValue}>
                  <span className={[styles.benchmarkValueNum, styles.benchmarkAvg].join(" ")}>
                    {bench.avgValue}
                  </span>
                  <Caption className={styles.benchmarkValueLabel}>Local avg</Caption>
                </div>
              </div>
              <Caption className={styles.benchmarkDesc}>{bench.description}</Caption>
            </div>
          ))}
        </div>
        {comparisons.map((insight) => (
          <div key={insight.id} className={styles.insightRow}>
            <InsightCard insight={insight} />
          </div>
        ))}
        {savings.map((insight) => (
          <div key={insight.id} className={styles.insightRow}>
            <InsightCard insight={insight} />
          </div>
        ))}
      </section>

      {/* Recommendations */}
      <section>
        <Heading level="h2" className={styles.sectionHeading}>Recommendations</Heading>
        <div className={styles.tipsGrid}>
          {tips.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

    </div>
  );
}
