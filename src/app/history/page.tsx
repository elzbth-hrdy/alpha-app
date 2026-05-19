import { HistoryClient } from "./HistoryClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Usage history — Good Energy Alpha",
};

export default function HistoryPage() {
  return (
    <main className={styles.main}>
      <HistoryClient />
    </main>
  );
}
