import React from "react";
import type { Insight, InsightType } from "@/lib/mock-data";
import { Button } from "@/design-system/components/Button";
import styles from "./InsightCard.module.css";

export interface InsightCardProps {
  insight: Insight;
}

const TYPE_LABELS: Record<InsightType, string> = {
  saving:     "Saving",
  tip:        "Tip",
  comparison: "Comparison",
  health:     "Health",
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className={[styles.card, styles[insight.type]].join(" ")}>
      <div className={styles.typeLabel}>{TYPE_LABELS[insight.type]}</div>
      <div className={styles.body}>
        <p className={styles.title}>{insight.title}</p>
        <p className={styles.text}>{insight.body}</p>
        {insight.actionLabel && (
          <Button variant="ghost" size="sm" className={styles.action}>
            {insight.actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
