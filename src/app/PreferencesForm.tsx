"use client";

import { Button } from "@/design-system/components/Button";
import { Card, CardBody } from "@/design-system/components/Card";
import { Input } from "@/design-system/components/Input";
import { Select } from "@/design-system/components/Input/Select";
import { Checkbox } from "@/design-system/components/Input/Checkbox";
import { Toggle } from "@/design-system/components/Input/Toggle";
import styles from "./page.module.css";

export function PreferencesForm() {
  return (
    <Card>
      <CardBody>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formRow}>
            <Input
              label="Your name"
              placeholder="e.g. Jane Smith"
              type="text"
              autoComplete="name"
            />
            <Input
              label="Email address"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />
          </div>

          <Select
            label="Preferred tariff type"
            hint="We'll recommend the best rate for your usage pattern."
            placeholder="Choose a tariff..."
          >
            <option value="smart">Smart Flex</option>
            <option value="fixed">Fixed Green</option>
            <option value="export">Export Plus</option>
          </Select>

          <Input
            label="MPAN (meter point reference)"
            hint="13-digit number found on your bill."
            placeholder="00 1234 5678 901"
          />

          <div className={styles.formToggles}>
            <Toggle
              label="Receive usage alerts"
              hint="Get notified when your daily usage is higher than usual."
              defaultChecked
            />
            <Toggle
              label="Enable smart scheduling"
              hint="Allow Good Energy to optimise your battery and EV charging times."
            />
          </div>

          <Checkbox label="I agree to Good Energy's terms and conditions and privacy policy." />

          <div className={styles.formActions}>
            <Button type="submit" size="md">Save preferences</Button>
            <Button type="reset" variant="secondary" size="md">Cancel</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
