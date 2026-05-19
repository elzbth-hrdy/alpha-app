import React from "react";
import styles from "./Select.module.css";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  hideLabel?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      placeholder,
      hideLabel = false,
      id,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id ?? React.useId();
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

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
          htmlFor={selectId}
          className={[styles.label, hideLabel ? styles.srOnly : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>

        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-describedby={
              [hintId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={error ? "true" : undefined}
            className={styles.select}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <ChevronIcon />
          </span>
        </div>

        {hint && !error && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
