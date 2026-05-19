"use client";

import React, { useState } from "react";
import { PeriodSelector } from "@/design-system/components/PeriodSelector";
import type { Period } from "@/design-system/components/PeriodSelector";
import { TimeSeriesChart } from "@/design-system/components/TimeSeriesChart";
import { StatCard, EnergyFlowBar } from "@/design-system/components/EnergyMetric";
import { Card, CardBody, CardHeader } from "@/design-system/components/Card";
import { Heading, Caption } from "@/design-system/components/Typography";
import { Button } from "@/design-system/components/Button";
import {
  todayHourly,
  aggregateWeek,
  aggregateMonth,
  aggregateYear,
  periodTotals,
} from "@/lib/mock-data";
import type { DailyPoint, HourlyPoint } from "@/lib/mock-data";
import styles from "./page.module.css";

function getPeriodData(period: Period): DailyPoint[] | HourlyPoint[] {
  switch (period) {
    case "day":   return todayHourly;
    case "week":  return aggregateWeek();
    case "month": return aggregateMonth();
    case "year":  return aggregateYear();
  }
}

function periodLabel(period: Period): string {
  switch (period) {
    case "day":   return "Today";
    case "week":  return "This week";
    case "month": return "This month";
    case "year":  return "This year";
  }
}

export function HistoryClient() {
  const [period, setPeriod] = useState<Period>("week");

  const data = getPeriodData(period);
  const totals = periodTotals(data);

  const costPounds = (totals.costPence / 100).toFixed(2);
  const earningsPounds = ((totals as { earningsPence?: number }).earningsPence
    ? ((totals as { earningsPence: number }).earningsPence / 100)
    : 0
  ).toFixed(2);
  const netPounds = (
    (Number(costPounds) - Number(earningsPounds))
  ).toFixed(2);

  return (
    <div className={styles.container}>

      <div className={styles.pageTitle}>
        <Heading as="h1" level="h1">Usage history</Heading>
      </div>

      <PeriodSelector value={period} onChange={setPeriod} />

      {/* Period stats */}
      <section aria-label={`${periodLabel(period)} summary`}>
        <Heading level="h2" className={styles.sectionHeading}>{periodLabel(period)}</Heading>
        <div className={styles.statsGrid}>
          <StatCard
            label="Imported"
            value={totals.import.toFixed(1)}
            unit="kWh"
            variant="yellow"
          />
          <StatCard
            label="Generated"
            value={totals.solar.toFixed(1)}
            unit="kWh"
            variant="green"
          />
          <StatCard
            label="Exported"
            value={totals.export.toFixed(1)}
            unit="kWh"
            variant="teal"
          />
          <StatCard
            label="Net cost"
            value={`£${netPounds}`}
            unit=""
            variant="default"
          />
        </div>
      </section>

      {/* Chart */}
      <Card>
        <CardHeader>
          <Heading level="h2">Usage and generation</Heading>
        </CardHeader>
        <CardBody>
          <TimeSeriesChart
            data={data}
            period={period}
            series={["import", "solar", "export"]}
            height={280}
            showBars={period === "month" || period === "year"}
          />
        </CardBody>
      </Card>

      {/* Energy balance */}
      <Card>
        <CardHeader>
          <Heading level="h2">Energy balance</Heading>
        </CardHeader>
        <CardBody>
          <EnergyFlowBar
            importKwh={Number(totals.import.toFixed(1))}
            solarKwh={Number(totals.solar.toFixed(1))}
            exportKwh={Number(totals.export.toFixed(1))}
          />
          <div className={styles.balanceSummary}>
            <div className={styles.balanceItem}>
              <span className={styles.balanceLabel}>Grid cost</span>
              <span className={styles.balanceValue}>£{costPounds}</span>
            </div>
            <div className={styles.balanceItem}>
              <span className={styles.balanceLabel}>Export earnings</span>
              <span className={[styles.balanceValue, styles.earningsValue].join(" ")}>+£{earningsPounds}</span>
            </div>
            <div className={[styles.balanceItem, styles.balanceNet].join(" ")}>
              <span className={styles.balanceLabel}>Net spend</span>
              <span className={styles.balanceValue}>£{netPounds}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className={styles.exportRow}>
        <Button variant="ghost" size="md" onClick={() => {}}>
          Export data
        </Button>
        <Caption className={styles.exportNote}>
          Download your energy data as CSV for {periodLabel(period).toLowerCase()}.
        </Caption>
      </div>

    </div>
  );
}
