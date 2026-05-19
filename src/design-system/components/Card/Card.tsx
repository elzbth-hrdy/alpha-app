import React from "react";
import styles from "./Card.module.css";

export type CardVariant = "default" | "elevated" | "outlined" | "yellow" | "dark";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: "div" | "article" | "section";
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  tabIndex?: number;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Card({
  variant = "default",
  padding = "md",
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        styles.card,
        styles[variant],
        styles[`pad-${padding}`],
        interactive ? styles.interactive : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className = "", children, ...props }: CardHeaderProps) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className = "", children, ...props }: CardBodyProps) {
  return (
    <div className={[styles.body, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = "", children, ...props }: CardFooterProps) {
  return (
    <div className={[styles.footer, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
