import { StatCard, EnergyGauge, EnergyFlowBar } from "@/design-system/components/EnergyMetric";
import { Card, CardBody } from "@/design-system/components/Card";
import { Heading, Body, Caption } from "@/design-system/components/Typography";
import { Badge } from "@/design-system/components/Badge";
import { Button } from "@/design-system/components/Button";
import { EnergyFlowDiagram } from "@/design-system/components/EnergyFlowDiagram";
import { TechHealthCard } from "@/design-system/components/TechHealthCard";
import { MatchedEnergyWidget } from "@/design-system/components/MatchedEnergyWidget";
import { installedTech, liveData, todayHourly, periodTotals, accountBalance } from "@/lib/mock-data";
import styles from "./page.module.css";

export default function DashboardPage() {
  const totals = periodTotals(todayHourly);
  const balance = accountBalance;
  const balanceLabel = balance.balancePounds >= 0
    ? `£${balance.balancePounds.toFixed(2)} credit`
    : `£${Math.abs(balance.balancePounds).toFixed(2)} debit`;

  return (
    <main className={styles.main}>

      {/* Energy flow — full width, above everything */}
      <section className={styles.flowSection} aria-label="Live energy flow">
        <div className={styles.flowSectionInner}>
          <div className={styles.flowSectionHeading}>
            <Heading level="h2">Energy flow</Heading>
            <Badge variant="teal" dot>Live</Badge>
          </div>
          <EnergyFlowDiagram liveData={liveData} />
        </div>
      </section>

      <div className={styles.container}>

        {/* Live stats */}
        <section aria-label="Live readings">
          <Heading level="h2" className={styles.sectionHeading}>Right now</Heading>
          <div className={styles.statsGrid4}>
            <StatCard
              label="Generation"
              value={String(liveData.solarKw)}
              unit="kW"
              variant="green"
            />
            <StatCard
              label="Home load"
              value={String(liveData.homeLoadKw)}
              unit="kW"
              variant="default"
            />
            <StatCard
              label="Export"
              value={String(liveData.exportKw)}
              unit="kW"
              variant="teal"
            />
            <div className={styles.batteryCard}>
              <Body size="sm" className={styles.batteryLabel}>Battery</Body>
              <EnergyGauge
                value={liveData.batteryPercent}
                max={100}
                label="Battery charge level"
                unit="%"
                color="var(--color-green)"
                size="sm"
              />
              <Caption className={styles.batteryCaption}>
                {liveData.batteryKw > 0 ? `Charging +${liveData.batteryKw} kW` : "Discharging"}
              </Caption>
            </div>
          </div>
        </section>

        {/* Account balance */}
        <section aria-label="Account balance">
          <Heading level="h2" className={styles.sectionHeading}>Account</Heading>
          <Card padding="md">
            <CardBody>
              <div className={styles.accountRow}>
                <div className={styles.accountBalance}>
                  <Body size="sm" className={styles.accountBalanceLabel}>Balance</Body>
                  <span className={[
                    styles.accountBalanceAmount,
                    balance.balancePounds >= 0 ? styles.balanceCredit : styles.balanceDebit,
                  ].join(" ")}>
                    {balanceLabel}
                  </span>
                  <Caption className={styles.accountBalanceCaption}>
                    Next payment £{balance.nextPaymentPounds.toFixed(2)} on {balance.nextPaymentDate}
                  </Caption>
                </div>
                <div className={styles.accountActions}>
                  <Button variant="secondary" size="sm">Make a payment</Button>
                  <Button variant="secondary" size="sm">Change Direct Debit</Button>
                  <Button variant="ghost" size="sm">Request a refund</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Matched energy mix */}
        <section aria-label="Matched energy mix">
          <Heading level="h2" className={styles.sectionHeading}>Matched energy mix</Heading>
          <Card padding="md">
            <CardBody>
              <MatchedEnergyWidget />
            </CardBody>
          </Card>
        </section>

        {/* Today's totals */}
        <section aria-label="Today's totals">
          <Heading level="h2" className={styles.sectionHeading}>Today so far</Heading>
          <div className={styles.statsGrid4}>
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
              label="Carbon saved"
              value={(totals.solar * 0.207).toFixed(1)}
              unit="kg CO₂"
              variant="default"
            />
          </div>

          {/* Flow bar summary */}
          <Card padding="md" className={styles.flowCard}>
            <CardBody>
              <EnergyFlowBar
                importKwh={Number(totals.import.toFixed(1))}
                solarKwh={Number(totals.solar.toFixed(1))}
                exportKwh={Number(totals.export.toFixed(1))}
              />
            </CardBody>
          </Card>
        </section>

        {/* Technology */}
        <section>
          <Heading level="h2" className={styles.sectionHeading}>Your technology</Heading>
          <div className={styles.techGrid}>
            {installedTech.map((tech) => (
              <TechHealthCard key={tech.id} tech={tech} />
            ))}
          </div>
        </section>

        {/* Quick nav cards */}
        <section aria-label="Quick access">
          <div className={styles.quickNav}>
            <a href="/ev" className={styles.quickNavCard}>
              <span className={styles.quickNavIcon} aria-hidden="true"><EVIcon /></span>
              <div>
                <p className={styles.quickNavTitle}>EV charging schedule</p>
                <p className={styles.quickNavSub}>Next cheap window: 00:00–07:00 tonight</p>
              </div>
              <ChevronIcon />
            </a>
            <a href="/history" className={styles.quickNavCard}>
              <span className={styles.quickNavIcon} aria-hidden="true"><ChartIcon /></span>
              <div>
                <p className={styles.quickNavTitle}>Usage history</p>
                <p className={styles.quickNavSub}>View your last 365 days</p>
              </div>
              <ChevronIcon />
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

function EVIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5L8.5 12.5h3L9.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8.5" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="3" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
