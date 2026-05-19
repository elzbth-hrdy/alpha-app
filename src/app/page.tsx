import { Button } from "@/design-system/components/Button";
import { Card, CardBody, CardHeader, CardFooter } from "@/design-system/components/Card";
import { Heading, Body, Lead, Caption } from "@/design-system/components/Typography";
import { Badge } from "@/design-system/components/Badge";
import { Alert } from "@/design-system/components/Alert";
import { StatCard, EnergyFlowBar } from "@/design-system/components/EnergyMetric";
import { TopNav } from "@/design-system/components/Navigation";
import { PreferencesForm } from "./PreferencesForm";
import styles from "./page.module.css";

const navItems = [
  { label: "Dashboard", href: "/", active: true },
  { label: "Energy", href: "/energy" },
  { label: "Services", href: "/services" },
  { label: "Account", href: "/account" },
];

export default function Home() {
  return (
    <>
      <TopNav items={navItems} />

      <main className={styles.main}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <Badge variant="teal" dot>Live data</Badge>
            <Heading as="h1" level="h1" className={styles.heroHeading}>
              Your clean energy, simply managed.
            </Heading>
            <Lead>
              See what you&apos;re using, what you&apos;re generating, and how
              much you&apos;re saving — all in one place.
            </Lead>
            <div className={styles.heroActions}>
              <Button size="lg">Get started</Button>
              <Button variant="secondary" size="lg">See how it works</Button>
            </div>
          </div>
        </section>

        <div className={styles.container}>

          {/* Alert example */}
          <Alert variant="success" title="Smart Export Guarantee activated">
            You&apos;re now earning 15p/kWh for every unit you send back to the grid.
          </Alert>

          {/* Stats row */}
          <section aria-label="Energy overview">
            <Heading level="h2" className={styles.sectionHeading}>
              Today&apos;s overview
            </Heading>
            <div className={styles.statsGrid}>
              <StatCard
                label="Imported today"
                value="4.2"
                unit="kWh"
                variant="default"
                trend="down"
                trendLabel="12% less than yesterday"
              />
              <StatCard
                label="Solar generated"
                value="8.7"
                unit="kWh"
                variant="yellow"
                trend="up"
                trendLabel="3.1 kWh more"
              />
              <StatCard
                label="Exported today"
                value="3.5"
                unit="kWh"
                variant="teal"
              />
              <StatCard
                label="Carbon saved"
                value="1.8"
                unit="kg CO₂"
                variant="green"
              />
            </div>
          </section>

          {/* Energy flow */}
          <section>
            <Heading level="h2" className={styles.sectionHeading}>
              Energy flow
            </Heading>
            <Card>
              <CardBody>
                <EnergyFlowBar
                  importKwh={4.2}
                  solarKwh={8.7}
                  exportKwh={3.5}
                />
              </CardBody>
            </Card>
          </section>

          {/* Services cards */}
          <section>
            <Heading level="h2" className={styles.sectionHeading}>
              Your services
            </Heading>
            <div className={styles.cardsGrid}>
              <Card interactive padding="md">
                <CardHeader>
                  <div className={styles.cardTitleRow}>
                    <Heading level="h3">Solar panels</Heading>
                    <Badge variant="success">Active</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <Body size="sm">
                    Your 6&nbsp;kWp system is generating well. Last service: March 2025.
                  </Body>
                </CardBody>
                <CardFooter>
                  <Button variant="ghost">View details</Button>
                </CardFooter>
              </Card>

              <Card interactive padding="md">
                <CardHeader>
                  <div className={styles.cardTitleRow}>
                    <Heading level="h3">Heat pump</Heading>
                    <Badge variant="info">Installed</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <Body size="sm">
                    Running efficiently at COP&nbsp;3.8. Hot water scheduled for 6am–8am.
                  </Body>
                </CardBody>
                <CardFooter>
                  <Button variant="ghost">Manage schedule</Button>
                </CardFooter>
              </Card>

              <Card interactive padding="md" variant="yellow">
                <CardHeader>
                  <div className={styles.cardTitleRow}>
                    <Heading level="h3">Battery storage</Heading>
                    <Badge variant="warning">72% charged</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <Body size="sm">
                    Charging from solar now. Set to discharge during peak hours 4–7pm.
                  </Body>
                </CardBody>
                <CardFooter>
                  <Button variant="secondary" size="sm">Adjust settings</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Form example */}
          <section>
            <Heading level="h2" className={styles.sectionHeading}>
              Update your preferences
            </Heading>
            <PreferencesForm />
          </section>

          {/* Alert variants */}
          <section>
            <Heading level="h2" className={styles.sectionHeading}>
              Notifications
            </Heading>
            <div className={styles.alertStack}>
              <Alert variant="info" title="Tariff update coming">
                Your Smart Flex rate changes on 1 June 2026. We&apos;ll email you the details.
              </Alert>
              <Alert variant="warning" title="High usage detected">
                You&apos;ve used 20% more energy today than your weekly average.
              </Alert>
              <Alert variant="error" title="Meter reading overdue" dismissible>
                Submit a reading to keep your bills accurate.
              </Alert>
            </div>
          </section>

        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Caption>
            © 2025 Good Energy Limited. Registered in England &amp; Wales No.&nbsp;3899276.
            Good Energy, Monkton Reach, Monkton Hill, Chippenham, Wiltshire SN15&nbsp;1EE.
          </Caption>
        </div>
      </footer>
    </>
  );
}
