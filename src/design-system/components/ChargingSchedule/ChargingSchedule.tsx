"use client";

import React, { useCallback, useRef, useState } from "react";
import type { ChargeSlot, EVStatus, TariffRate } from "@/lib/mock-data";
import styles from "./ChargingSchedule.module.css";

export interface ChargingScheduleProps {
  slots: ChargeSlot[];
  onChange: (slots: ChargeSlot[]) => void;
  evStatus: EVStatus;
  disabled?: boolean;
}

function slotToTime(index: number): string {
  const h = Math.floor(index / 2);
  const m = index % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
}

function calcEstimates(slots: ChargeSlot[], evStatus: EVStatus) {
  const selectedSlots = slots.filter((s) => s.selected);
  const hours = selectedSlots.length * 0.5;
  const kWh = Math.min(hours * evStatus.chargerKw, evStatus.vehicleKwh * (evStatus.targetPercent - evStatus.batteryPercent) / 100);
  const costPence = selectedSlots.reduce((sum, s) => sum + s.pencePerKwh * evStatus.chargerKw * 0.5, 0);
  return {
    hours: Math.round(hours * 10) / 10,
    kWh: Math.max(0, Math.round(kWh * 10) / 10),
    costPence: Math.round(costPence),
  };
}

export function ChargingSchedule({ slots, onChange, evStatus, disabled = false }: ChargingScheduleProps) {
  const isDragging = useRef(false);
  const dragStartSelected = useRef(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const toggleSlot = useCallback((index: number, forceValue?: boolean) => {
    if (disabled) return;
    onChange(
      slots.map((s) =>
        s.slotIndex === index
          ? { ...s, selected: forceValue !== undefined ? forceValue : !s.selected }
          : s
      )
    );
  }, [slots, onChange, disabled]);

  const handlePointerDown = (index: number) => {
    if (disabled) return;
    isDragging.current = true;
    dragStartSelected.current = !slots[index].selected;
    toggleSlot(index, dragStartSelected.current);
    setActiveSlot(index);
  };

  const handlePointerEnter = (index: number) => {
    if (!isDragging.current || disabled) return;
    toggleSlot(index, dragStartSelected.current);
    setActiveSlot(index);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setActiveSlot(null);
  };

  const estimates = calcEstimates(slots, evStatus);
  const currentSlot = Math.floor((new Date().getHours() * 2) + (new Date().getMinutes() >= 30 ? 1 : 0));

  // Slot groups: first 24 (midnight–noon) and second 24 (noon–midnight)
  const firstRow = slots.slice(0, 24);
  const secondRow = slots.slice(24, 48);

  const renderSlot = (slot: ChargeSlot) => (
    <button
      key={slot.slotIndex}
      type="button"
      role="switch"
      aria-checked={slot.selected}
      aria-label={`${slotToTime(slot.slotIndex)}–${slotToTime(slot.slotIndex + 1)}, ${slot.pencePerKwh}p/kWh, ${slot.selected ? "scheduled" : "not scheduled"}`}
      className={[
        styles.slot,
        styles[slot.rate],
        slot.selected ? styles.selected : "",
        slot.slotIndex === currentSlot ? styles.current : "",
        disabled ? styles.slotDisabled : "",
        activeSlot === slot.slotIndex ? styles.slotActive : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerDown={() => handlePointerDown(slot.slotIndex)}
      onPointerEnter={() => handlePointerEnter(slot.slotIndex)}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setActiveSlot(null)}
      onClick={() => {}} // handled by pointer events
    />
  );

  return (
    <div className={styles.wrapper} onPointerLeave={handlePointerUp}>
      <div className={styles.grid}>
        <div className={styles.row}>{firstRow.map(renderSlot)}</div>
        <div className={styles.timeLabels} aria-hidden="true">
          <span>00:00</span>
          <span>03:00</span>
          <span>06:00</span>
          <span>09:00</span>
          <span>12:00</span>
        </div>
        <div className={styles.row}>{secondRow.map(renderSlot)}</div>
        <div className={styles.timeLabels} aria-hidden="true">
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>21:00</span>
          <span>24:00</span>
        </div>
      </div>

      <div className={styles.estimates}>
        <div className={styles.estimate}>
          <span className={styles.estimateValue}>{estimates.hours}h</span>
          <span className={styles.estimateLabel}>Scheduled</span>
        </div>
        <div className={styles.estimateDivider} />
        <div className={styles.estimate}>
          <span className={styles.estimateValue}>{estimates.kWh} kWh</span>
          <span className={styles.estimateLabel}>Estimated charge</span>
        </div>
        <div className={styles.estimateDivider} />
        <div className={styles.estimate}>
          <span className={styles.estimateValue}>£{(estimates.costPence / 100).toFixed(2)}</span>
          <span className={styles.estimateLabel}>Estimated cost</span>
        </div>
      </div>
    </div>
  );
}
