import { InsightsClient } from "./InsightsClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Insights — Good Energy Alpha",
};

export default function InsightsPage() {
  return (
    <main className={styles.main}>
      <InsightsClient />
    </main>
  );
}
