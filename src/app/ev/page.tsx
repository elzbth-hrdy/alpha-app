import { EVScheduleClient } from "./EVScheduleClient";
import styles from "./page.module.css";

export const metadata = {
  title: "EV charging schedule — Good Energy Alpha",
};

export default function EVPage() {
  return (
    <main className={styles.main}>
      <EVScheduleClient />
    </main>
  );
}
