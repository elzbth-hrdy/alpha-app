import React from "react";
import styles from "./Typography.module.css";

/* ---------------------------------------------------------------------------
   Heading
   Sharp Sans No.2 Semibold — for all structural headings.
   Always sentence case, tracking 0.
   --------------------------------------------------------------------------- */

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  level?: HeadingLevel;
}

export function Heading({
  as,
  level = "h2",
  className = "",
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? level;
  return (
    <Tag
      className={[styles.heading, styles[Tag], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   Body
   Sharp Sans No.2 Medium — primary body copy.
   --------------------------------------------------------------------------- */

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "md" | "lg";
  as?: "p" | "span" | "div";
}

export function Body({
  size = "base",
  as: Tag = "p",
  className = "",
  children,
  ...props
}: BodyProps) {
  return (
    <Tag
      className={[styles.body, styles[`body-${size}`], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   Lead / Intro
   Larger body text — use as introductory paragraph beneath a heading.
   --------------------------------------------------------------------------- */

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function Lead({ className = "", children, ...props }: LeadProps) {
  return (
    <p className={[styles.lead, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------------------
   Caption / Small
   Sharp Sans No.2 Book — footnotes, small print, caveats.
   --------------------------------------------------------------------------- */

export interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "figcaption";
}

export function Caption({
  as: Tag = "p",
  className = "",
  children,
  ...props
}: CaptionProps) {
  return (
    <Tag
      className={[styles.caption, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   Label
   Sharp Sans No.2 Semibold — form labels, tags, data labels.
   --------------------------------------------------------------------------- */

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "label" | "p";
  htmlFor?: string;
}

export function Label({
  as: Tag = "span",
  className = "",
  children,
  htmlFor,
  ...props
}: LabelProps) {
  return (
    <Tag
      className={[styles.label, className].filter(Boolean).join(" ")}
      {...(htmlFor ? { htmlFor } : {})}
      {...props}
    >
      {children}
    </Tag>
  );
}
