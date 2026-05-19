import { StatCard, EnergyGauge, EnergyFlowBar } from "@/design-system/components/EnergyMetric";
import { Card, CardBody } from "@/design-system/components/Card";
import { Heading, Body, Caption } from "@/design-system/components/Typography";
import { Badge } from "@/design-system/components/Badge";
import { EnergyFlowDiagram } from "@/design-system/components/EnergyFlowDiagram";
import { TechHealthCard } from "@/design-system/components/TechHealthCard";
import { installedTech, liveData, todayHourly, periodTotals } from "@/lib/mock-data";
import styles from "./page.module.css";

export default function DashboardPage() {
  const totals = periodTotals(todayHourly);

  return (
    <main className={styles.main}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderContent}>
          <div className={styles.greeting}>
            <div>
              <Heading as="h1" level="h1" className={styles.greetingHeading}>
                Good morning
              </Heading>
              <Body size="sm" className={styles.greetingDate}>
                Monday, 19 May 2026
              </Body>
            </div>
            <Badge variant="teal" dot>Live</Badge>
          </div>
        </div>
      </div>

      <div className={styles.container}>

        {/* Live stats */}
        <section aria-label="Live readings">
          <Heading level="h2" className={styles.sectionHeading}>Right now</Heading>
          <div className={styles.statsGrid4}>
            <StatCard
              label="Solar"
              value={String(liveData.solarKw)}
              unit="kW"
              variant="yellow"
              icon={<SunIcon />}
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

        {/* Energy flow diagram */}
        <section>
          <Heading level="h2" className={styles.sectionHeading}>Energy flow</Heading>
          <Card variant="dark" padding="md">
            <CardBody>
              <EnergyFlowDiagram liveData={liveData} />
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
              variant="default"
            />
            <StatCard
              label="Generated"
              value={totals.solar.toFixed(1)}
              unit="kWh"
              variant="yellow"
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
              variant="green"
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

      <footer className={styles.footer}>
        <Caption>
          © 2025 Good Energy Limited. Registered in England &amp; Wales No.&nbsp;3899276.
        </Caption>
      </footer>
    </main>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
