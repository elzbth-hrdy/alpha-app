"use client";

import React, { useState } from "react";
import { ChargingSchedule } from "@/design-system/components/ChargingSchedule";
import { TariffTimeline } from "@/design-system/components/TariffTimeline";
import { Toggle } from "@/design-system/components/Input";
import { Button } from "@/design-system/components/Button";
import { Alert } from "@/design-system/components/Alert";
import { Badge } from "@/design-system/components/Badge";
import { EnergyGauge } from "@/design-system/components/EnergyMetric";
import { Card, CardBody, CardHeader } from "@/design-system/components/Card";
import { Heading, Body, Caption } from "@/design-system/components/Typography";
import { defaultChargeSlots, tariffPeriods, evStatus } from "@/lib/mock-data";
import type { ChargeSlot } from "@/lib/mock-data";
import styles from "./page.module.css";

export function EVScheduleClient() {
  const [slots, setSlots] = useState<ChargeSlot[]>(defaultChargeSlots);
  const [smartMode, setSmartMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const currentHour = new Date().getHours();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>

      {/* Page title */}
      <div className={styles.pageTitle}>
        <Heading as="h1" level="h1">EV charging schedule</Heading>
        <Badge variant="info">Smart Flex tariff</Badge>
      </div>

      <Alert variant="info" title="Time-of-use charging">
        Schedule your charging overnight during off-peak periods (8.5p/kWh) to cut costs.
        Evening peak rates reach 38p/kWh — avoid charging then if you can.
      </Alert>

      {/* Current EV status */}
      <Card>
        <CardHeader>
          <Heading level="h2">Current charge status</Heading>
        </CardHeader>
        <CardBody>
          <div className={styles.evStatus}>
            <div className={styles.evGauge}>
              <EnergyGauge
                value={evStatus.batteryPercent}
                max={100}
                label="EV battery charge"
                unit="%"
                color="var(--color-green)"
                size="lg"
              />
              <div className={styles.evGaugeLabels}>
                <Caption>Current: {evStatus.batteryPercent}%</Caption>
                <Caption>Target: {evStatus.targetPercent}%</Caption>
              </div>
            </div>
            <div className={styles.evDetails}>
              <div className={styles.evDetailRow}>
                <span className={styles.evDetailLabel}>Vehicle</span>
                <span className={styles.evDetailValue}>{evStatus.vehicleName}</span>
              </div>
              <div className={styles.evDetailRow}>
                <span className={styles.evDetailLabel}>Battery capacity</span>
                <span className={styles.evDetailValue}>{evStatus.vehicleKwh} kWh</span>
              </div>
              <div className={styles.evDetailRow}>
                <span className={styles.evDetailLabel}>Charger rate</span>
                <span className={styles.evDetailValue}>{evStatus.chargerKw} kW</span>
              </div>
              <div className={styles.evDetailRow}>
                <span className={styles.evDetailLabel}>To reach {evStatus.targetPercent}%</span>
                <span className={styles.evDetailValue}>
                  ~{(((evStatus.targetPercent - evStatus.batteryPercent) / 100 * evStatus.vehicleKwh) / evStatus.chargerKw).toFixed(1)} hrs
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tariff timeline */}
      <Card>
        <CardHeader>
          <Heading level="h2">Today&apos;s tariff rates</Heading>
        </CardHeader>
        <CardBody>
          <TariffTimeline periods={tariffPeriods} currentHour={currentHour} />
        </CardBody>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <div className={styles.scheduleHeader}>
            <Heading level="h2">Charging schedule</Heading>
            <Toggle
              label="Smart mode"
              checked={smartMode}
              onChange={(e) => setSmartMode(e.target.checked)}
              hint=""
            />
          </div>
        </CardHeader>
        <CardBody>
          {smartMode && (
            <Alert variant="info" className={styles.smartAlert}>
              Smart charging is on — we&apos;re scheduling your charge during the cheapest overnight windows.
              Toggle off to set a manual schedule.
            </Alert>
          )}
          <Body size="sm" className={styles.scheduleHint}>
            {smartMode
              ? "Your schedule is managed automatically."
              : "Tap or drag to select charge windows. Green = cheap, blue = standard, red = peak."}
          </Body>
          <div className={styles.scheduleWrapper}>
            <ChargingSchedule
              slots={slots}
              onChange={setSlots}
              evStatus={evStatus}
              disabled={smartMode}
            />
          </div>
          <div className={styles.scheduleActions}>
            {saved && (
              <Alert variant="success" title="Schedule saved">
                Your charging schedule has been updated.
              </Alert>
            )}
            <div className={styles.actionButtons}>
              <Button variant="primary" size="md" onClick={handleSave} disabled={smartMode}>
                Apply schedule
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSlots(defaultChargeSlots)}
                disabled={smartMode}
              >
                Reset to default
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Forecast table */}
      <Card>
        <CardHeader>
          <div className={styles.forecastHeader}>
            <Heading level="h2">7-day rate forecast</Heading>
            <Badge variant="warning">Beta</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <table className={styles.forecastTable}>
            <thead>
              <tr>
                <th>Night</th>
                <th>Off-peak rate</th>
                <th>Peak rate</th>
                <th>Rec. window</th>
              </tr>
            </thead>
            <tbody>
              {[
                { night: "Mon 19 May", cheap: "8.5p", peak: "38p", window: "00:00–07:00" },
                { night: "Tue 20 May", cheap: "7.9p", peak: "36p", window: "00:30–07:00" },
                { night: "Wed 21 May", cheap: "9.1p", peak: "40p", window: "00:00–06:30" },
                { night: "Thu 22 May", cheap: "8.2p", peak: "37p", window: "00:00–07:00" },
                { night: "Fri 23 May", cheap: "7.5p", peak: "35p", window: "01:00–07:00" },
                { night: "Sat 24 May", cheap: "6.8p", peak: "34p", window: "00:00–08:00" },
                { night: "Sun 25 May", cheap: "7.1p", peak: "33p", window: "00:00–08:00" },
              ].map((row) => (
                <tr key={row.night}>
                  <td>{row.night}</td>
                  <td className={styles.cheapCell}>{row.cheap}</td>
                  <td className={styles.peakCell}>{row.peak}</td>
                  <td className={styles.windowCell}>{row.window}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Caption className={styles.forecastNote}>
            Rates are indicative forecasts based on Agile-style pricing signals. Actual rates may vary.
          </Caption>
        </CardBody>
      </Card>

    </div>
  );
}
