import React from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, hint, id, className = "", disabled, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div
        className={[styles.wrapper, disabled ? styles.disabled : "", className]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.row}>
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
          <div className={styles.toggleTrack}>
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              role="switch"
              disabled={disabled}
              aria-describedby={hintId}
              className={styles.input}
              {...props}
            />
            <span className={styles.thumb} aria-hidden="true" />
          </div>
        </div>
        {hint && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
