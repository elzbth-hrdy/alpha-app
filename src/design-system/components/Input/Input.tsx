import React from "react";
import styles from "./Input.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Hides label visually while keeping it accessible */
  hideLabel?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      iconLeft,
      iconRight,
      hideLabel = false,
      id,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div
        className={[
          styles.wrapper,
          error ? styles.hasError : "",
          disabled ? styles.disabled : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label
          htmlFor={inputId}
          className={[styles.label, hideLabel ? styles.srOnly : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>

        <div className={styles.inputWrapper}>
          {iconLeft && (
            <span className={styles.iconLeft} aria-hidden="true">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-describedby={
              [hintId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={error ? "true" : undefined}
            className={[
              styles.input,
              iconLeft ? styles.withIconLeft : "",
              iconRight ? styles.withIconRight : "",
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />
          {iconRight && (
            <span className={styles.iconRight} aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>

        {hint && !error && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            <ErrorIcon />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

function ErrorIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="7"
        y1="4"
        x2="7"
        y2="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="7" cy="9.5" r="0.75" fill="currentColor" />
    </svg>
  );
}
