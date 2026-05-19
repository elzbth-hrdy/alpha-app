# Good Energy — App Design & Brand Guidelines

> Based on Good Energy Brand Guidelines 2025.
> This document is the source of truth for design decisions in the Good Energy alpha app.

---

## Contents

1. [Brand foundation](#1-brand-foundation)
2. [Tone of voice & UX copy](#2-tone-of-voice--ux-copy)
3. [Colour palette](#3-colour-palette)
4. [Typography](#4-typography)
5. [Spacing & layout](#5-spacing--layout)
6. [Iconography](#6-iconography)
7. [Logos](#7-logos)
8. [Components](#8-components)
9. [Accessibility](#9-accessibility)
10. [Photography & imagery](#10-photography--imagery)
11. [Data visualisation](#11-data-visualisation)
12. [Design tokens reference](#12-design-tokens-reference)

---

## 1. Brand foundation

### Purpose

> To power a cleaner, greener future.
> By making it simple to generate, use and share clean energy.

Good Energy was founded in 1999 to tackle climate change. The app exists to give homes and businesses a practical, simple tool for managing their renewable energy — import tariffs, export tariffs, solar, heat pumps, batteries, and EV charging.

### Values

| Value | What it means in the app |
|---|---|
| **Focused** | Clear information hierarchy. Don't clutter screens. One primary action per view. |
| **Inclusive** | Accessible to all users. Plain English. Works on any device. |
| **Straightforward** | Direct language. Real numbers. No jargon unless the audience expects it. |
| **Fair** | Transparent pricing, accurate data, no dark patterns. |

### How we want users to feel

- Knowledgeable — they understand their energy
- In control — they can take action
- Supported — help is nearby when they need it
- Positive — clean energy is a win worth celebrating

### What we never want users to feel

Confused, talked down to, pressured, overwhelmed, or left out.

---

## 2. Tone of voice & UX copy

### Guiding principles

**Be direct and confident**
Use active voice. State the benefit clearly. Avoid hedging language like "may", "could" or "might" where a fact is available.

```
✅ You're generating 8.7 kWh today.
❌ Your system could be generating energy at this time.
```

**Make it personal**
Write directly to the user. Use "you", "we" and "us". Avoid corporate speak.

```
✅ We've updated your tariff rate.
❌ The customer's tariff rate has been updated by Good Energy.
```

**Sound friendly but professional**
Use contractions naturally — "you're", "we've", "don't". Avoid exclamation marks except in genuine celebratory moments (first solar generation, first export payment). Never use two in a row.

```
✅ Your first export payment is on its way.
❌ Congratulations!!! You've exported energy!!!
```

**Make it real**
Be specific. Numbers, dates, and facts are more reassuring than vague statements.

```
✅ You saved 1.8 kg CO₂ today — that's the equivalent of driving 7 miles.
❌ You're making a difference to the environment.
```

**Keep it clear**
Short sentences. Frequent, scannable headings. Max ~2 sentences per notification or tooltip. Don't rely on users reading everything.

**Don't preach**
Good Energy customers already believe in clean energy. Don't lecture them on climate change in the UI — celebrate the practical wins instead.

### Sentence case everywhere

Headlines, button labels, navigation items, and form labels all use **sentence case**.

```
✅ Get started
✅ View your bill
✅ Smart Export Guarantee

❌ Get Started
❌ View Your Bill
```

Exception: proper nouns, product names (Smart Export Guarantee, Ofgem, MPAN).

### Numbers and units

- Energy: `8.7 kWh` (not `8.7KWH` or `8.7kwh`)
- Currency: `£12.50` (not `12.50 GBP`)
- CO₂: `1.8 kg CO₂` (use the subscript 2)
- Dates: `14 May 2025` (not `14/05/2025` in prose)
- Percentages: `72%` (no space before %)

### Accessibility-first copy

- Always provide alt text for images
- Use `aria-label` on icon-only buttons: `aria-label="Close notification"`
- Error messages must explain what went wrong and how to fix it
- Empty states need a helpful explanation, not just an empty screen

### UX copy patterns

| Context | Guidance | Example |
|---|---|---|
| **CTA buttons** | Verb + object. Specific. | "View bill", "Add meter reading", "Explore tariffs" |
| **Error messages** | Plain language, what to do next | "We couldn't load your data. Try refreshing the page." |
| **Success messages** | Confirm what happened | "Your preferences have been saved." |
| **Empty states** | Explain why, offer an action | "No readings yet. Add your first meter reading to see your usage." |
| **Tooltips** | One sentence max | "Your MPAN is the 13-digit number on your electricity bill." |
| **Loading states** | Reassure, be specific if possible | "Loading your energy data…" |
| **Onboarding** | Welcome warmly, set expectations | "Let's get your account set up. It takes about 3 minutes." |

### Audience flex: domestic vs business

The same writing principles apply to both audiences, but the vocabulary shifts:

| Domestic (B2C) | Business (B2B) |
|---|---|
| "Your home" | "Your site" or "Your premises" |
| "Energy bill" | "Consumption costs" |
| "Solar panels" | "Generation assets" / "PV installation" |
| "Heat pump" | "Heat pump system" |
| "Export payments" | "SEG income" / "Power Purchase Agreement" |

---

## 3. Colour palette

### Primary palette

| Name | Hex | CSS Token | Usage |
|---|---|---|---|
| **Yellow** | `#FFDC14` | `--color-yellow` | Primary CTA, hero backgrounds, highlights. The hero colour of the brand. |
| **Yellow Hover** | `#F0CE00` | `--color-yellow-hover` | Button hover state |
| **Yellow Muted** | `#FFF6B3` | `--color-yellow-muted` | Subtle backgrounds, active nav items |
| **Rich Black** | `#020000` | `--color-rich-black` | Primary text, dark backgrounds, secondary buttons |
| **Dark Grey** | `#46413E` | `--color-dark-grey` | Body text on light backgrounds, B2B contexts |
| **Mid Grey** | `#8B8784` | `--color-mid-grey` | Placeholder text, disabled states, captions |
| **Light Grey** | `#E1E1E1` | `--color-light-grey` | Borders, dividers, input borders |
| **Off-White** | `#F9F9F9` | `--color-off-white` | Page backgrounds, table rows, subtle fills |
| **White** | `#FFFFFF` | `--color-white` | Card backgrounds, input fills |

### Supporting palette (B2C accents)

| Name | Hex | CSS Token | Usage |
|---|---|---|---|
| **Teal** | `#009BBF` | `--color-teal` | Links, info states, import data, focus rings |
| **Dark Teal** | `#0C657A` | `--color-teal-dark` | Link text, accessible teal on white |
| **Teal Forest** | `#00464C` | `--color-teal-forest` | Deep accent, footer backgrounds |
| **Turquoise** | `#52B8D0` | `--color-turquoise` | Charts, data visualisation |
| **Turquoise Light** | `#A8DCE8` | `--color-turquoise-light` | Tints, chart fills |
| **Green** | `#00B889` | `--color-green` | Success states, export data, CO₂ savings |
| **Green Mid** | `#6FC3BB` | `--color-green-mid` | Charts |
| **Green Dark** | `#4A7F7A` | `--color-green-dark` | Success text on light backgrounds |
| **Green Pale** | `#9CD4CF` | `--color-green-pale` | Subtle success fills |
| **Green Mist** | `#CEEAE7` | `--color-green-mist` | Success background tints |

### Semantic colours

| State | Background | Text/Icon | Token |
|---|---|---|---|
| Success | `#E6F9F4` | `#4A7F7A` | `--color-success` / `--color-success-bg` |
| Warning | `#FFFCE6` | `#46413E` | `--color-warning` / `--color-warning-bg` |
| Error | `#FDECEA` | `#D93025` | `--color-error` / `--color-error-bg` |
| Info | `#E5F5FA` | `#0C657A` | `--color-info` / `--color-info-bg` |

### Accessible colour combinations

Use these approved pairings. Never use yellow text on a white/light background on screen.

| Background | Text colour | Use case |
|---|---|---|
| White / Off-white | Rich Black or Dark Grey | Standard body text |
| Yellow | Rich Black | CTAs, hero text, card headings |
| Rich Black / Dark Grey | White or Yellow | Dark section headings, nav on dark |
| Teal / Green (dark) | White | Coloured stat cards |
| Supporting tints (pale) | Rich Black or Dark Grey | Alert backgrounds, subtle fills |

**Never use:**
- Yellow text on white (very hard to read on screen)
- White text on yellow
- Yellow text on off-white

### B2B note

In B2B contexts, use the primary palette (yellow, rich black, greys) with clean, minimal application. Reserve teal and green accents for data and status indicators only. Avoid decorative gradients or heavy colour use.

---

## 4. Typography

### Typeface

**Sharp Sans No.2** is the Good Energy brand typeface (licensed). Font files go in `/public/fonts/`. Register via `next/font/local` in `src/app/layout.tsx`.

For development, **Plus Jakarta Sans** (Google Fonts) is used as a close visual substitute. Arial is the approved backup for editable documents and emails.

```css
--font-brand: "Sharp Sans No.2", var(--font-brand-loaded), "Plus Jakarta Sans", Arial, system-ui, sans-serif;
```

### Weights

| Weight | Name | Use |
|---|---|---|
| 300 | Book | Footnotes, caveats, small print |
| 500 | Medium | Body copy — all standard text |
| 600 | Semibold | Headings — tracking 0, sentence case |
| 700 | Bold | Subheadings, key word highlights, links, data labels |

### Type scale (mobile → desktop)

| Token | Mobile | Desktop (≥768px) | Use |
|---|---|---|---|
| `--text-xs` | 12px | 12px | Badges, timestamps, micro-labels |
| `--text-sm` | 14px | 14px | Captions, form hints, small print |
| `--text-base` | 16px | 16px | Body copy (default) |
| `--text-md` | 18px | 18px | Large body, lead text |
| `--text-lg` | 20px | 20px | h5 mobile, h4 mobile |
| `--text-xl` | 24px | 24px | h3 mobile, h4 desktop |
| `--text-2xl` | 30px | 30px | h2 mobile, h3 desktop |
| `--text-3xl` | 36px | 36px | h1 mobile, h2 desktop |
| `--text-4xl` | 48px | 48px | h1 desktop |
| `--text-5xl` | 60px | 60px | Display / hero (use sparingly) |

### Heading hierarchy

```
h1 — Page title / hero headline (Semibold)
h2 — Section heading (Semibold)
h3 — Card heading / subsection (Semibold)
h4 — Group label (Semibold)
h5 — Tight label (Semibold)
h6 — Smallest structural label (Semibold)
```

### Rules

- **Always sentence case** for headings and labels. Never title case. Never ALL CAPS (unless a historically approved banner like the email header bar).
- Semibold tracking: `0` (do not adjust letter-spacing on headings)
- Bold subheadings tracking: `0.03em`
- Max line length for body copy: `70ch`
- Line height body: `1.65` (relaxed) / headings: `1.2` (tight)

---

## 5. Spacing & layout

### Grid

All layouts are **mobile-first**. The base unit is `4px` (0.25rem).

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Micro gaps, icon padding |
| `--space-2` | 8px | Inline gap, badge padding |
| `--space-3` | 12px | Small component padding |
| `--space-4` | 16px | Default component padding, page gutter (mobile) |
| `--space-5` | 20px | |
| `--space-6` | 24px | Card padding, section gap (mobile) |
| `--space-8` | 32px | Section gap (desktop), card padding (desktop) |
| `--space-10` | 40px | Section spacing |
| `--space-12` | 48px | Hero padding |
| `--space-16` | 64px | Large section separators |
| `--space-20` | 80px | Hero vertical padding (desktop) |

### Breakpoints

| Token | Value | Description |
|---|---|---|
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets / desktop drawer hides |
| `lg` | 1024px | Desktop layouts, 3+ column grids |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

### Container

Use `.container-brand` for all page-level content:
- Max width: `1200px`
- Padding: `16px` (mobile) → `24px` (sm) → `32px` (lg)

### Border radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Checkbox, small badges |
| `--radius-md` | 8px | Tooltips, dropdown items |
| `--radius-lg` | 12px | Inputs, select, textarea |
| `--radius-xl` | 16px | Cards, panels |
| `--radius-2xl` | 24px | Large hero cards |
| `--radius-full` | 9999px | Buttons (pill), toggles, badges |

---

## 6. Iconography

### Principles

Icons are designed from the same visual vocabulary as the logo: rounded strokes, rounded rectangles, and full circles. They must work at small sizes (16px minimum).

- Icon stroke width: `1/29` of the containing circle diameter
- Always used with accompanying text (never icon-only without an `aria-label`)
- Use only from the primary colour palette (Rich Black, Dark Grey, or White)
- Never use the supporting colour palette for icons
- Icon variants: outline stroke or solid circle container

### Energy-specific icon set (recommended)

| Icon | Use case |
|---|---|
| Sun / Solar panel | Solar generation |
| Bolt / Lightning | Electricity usage |
| Plug | Import from grid |
| Arrow up-right | Export to grid |
| Flame | Heating / heat pump |
| Battery | Battery storage |
| Car / EV | EV charging |
| Leaf | CO₂ / environmental |
| Graph | Data / usage history |
| Gear | Settings |
| Bell | Notifications |
| House | Home / account |

### Creating new icons

Build from these primitives:
1. A rounded stroke (stroke-linecap: round)
2. A rounded rectangle or circle
3. A filled circle (for containers)

Maintain the safe area — icons must not touch the edge of their bounding circle.

---

## 7. Logos

### Primary logo

A yellow circle with the Good Energy wordmark. This is the primary mark — use it wherever possible.

**File locations:** `/public/logos/`

| File | Use |
|---|---|
| `logo-primary.svg` | Default — yellow on transparent/white |
| `logo-alternative.svg` | Yellow background use only |
| `logo-horizontal.svg` | When vertical space is constrained |
| `logo-greyscale.svg` | Single-colour print |
| `logo-monotone.svg` | One solid colour print |

### Safe area

The safe area around any logo equals the height of one lowercase "g" from its typeface. No other design element may enter this space.

### Do's

- Use the primary (yellow circle) logo on white or light backgrounds
- Use the horizontal logo when vertical space doesn't accommodate the primary
- Use greyscale/monotone only when printing in a single colour

### Don'ts

- Don't rotate the logo
- Don't change logo colours (except approved greyscale versions)
- Don't rearrange the lockup
- Don't use the alternative logo when the primary works
- Don't cover the logo with other elements
- Don't place the logo on a busy photograph without ensuring legibility

---

## 8. Components

All components live in `src/design-system/components/`. They are mobile-first, accessible, and use CSS Modules with design tokens.

### Button

**File:** `src/design-system/components/Button/`

```tsx
import { Button } from "@/design-system/components/Button";

<Button variant="primary" size="md">Get started</Button>
<Button variant="secondary" size="md">Learn more</Button>
<Button variant="ghost" size="md">View details</Button>
<Button variant="danger" size="md">Delete account</Button>
<Button variant="primary" size="md" loading>Saving...</Button>
<Button variant="primary" size="lg" fullWidth>Continue</Button>
```

| Variant | Background | Text | Use |
|---|---|---|---|
| `primary` | Yellow `#FFDC14` | Rich Black | Primary CTA — use once per screen |
| `secondary` | Transparent | Rich Black | Secondary action |
| `ghost` | None | Dark Teal | Low-emphasis, inline actions |
| `danger` | Error Red `#D93025` | White | Destructive actions only |

| Size | Height | Font | Use |
|---|---|---|---|
| `sm` | 36px | 14px | Compact layouts, table actions |
| `md` | 48px | 16px | Default |
| `lg` | 56px | 18px | Hero CTAs, prominent actions |

**Accessibility:** All buttons use `border-radius: full` (pill shape). Focus state: 3px teal outline. Loading state sets `aria-busy="true"`.

### Input

**File:** `src/design-system/components/Input/`

```tsx
import { Input } from "@/design-system/components/Input";

<Input label="Email address" type="email" placeholder="you@example.com" />
<Input label="MPAN" hint="13-digit number on your bill." />
<Input label="Postcode" error="Enter a valid UK postcode." />
```

- Min height: `48px`
- Border: 2px `--color-light-grey` → teal on focus
- Border radius: `--radius-lg` (12px)
- Labels: Semibold 14px, always visible
- Hints: Book 14px, dark grey
- Errors: Bold 14px, error red, with icon

### Select

```tsx
import { Select } from "@/design-system/components/Input/Select";

<Select label="Tariff type" hint="..." placeholder="Choose...">
  <option value="smart">Smart Flex</option>
</Select>
```

Custom chevron, full keyboard accessible.

### Checkbox

```tsx
import { Checkbox } from "@/design-system/components/Input/Checkbox";

<Checkbox label="I agree to the terms and conditions." />
<Checkbox label="Receive email updates" hint="Weekly energy digest." />
```

Yellow fill on checked. Black check SVG for contrast.

### Toggle / Switch

```tsx
import { Toggle } from "@/design-system/components/Input/Toggle";

<Toggle label="Enable smart scheduling" hint="..." defaultChecked />
```

Yellow track when on. 52×28px track. Uses `role="switch"`.

### Textarea

```tsx
import { Textarea } from "@/design-system/components/Input/Textarea";

<Textarea label="Tell us more" rows={4} />
```

### Card

**File:** `src/design-system/components/Card/`

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/design-system/components/Card";

<Card variant="default" padding="md">
  <CardHeader>…</CardHeader>
  <CardBody>…</CardBody>
  <CardFooter>…</CardFooter>
</Card>

<Card variant="yellow" interactive>…</Card>
<Card variant="dark">…</Card>
```

| Variant | Background | Use |
|---|---|---|
| `default` | White + light border | Standard content card |
| `elevated` | White + shadow | Floating/popup cards |
| `outlined` | Transparent + 2px black border | Highlighted content |
| `yellow` | Yellow | Feature / promotional card |
| `dark` | Rich Black | Dark-theme sections, energy dashboard |

### Badge

```tsx
import { Badge } from "@/design-system/components/Badge";

<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">72% charged</Badge>
<Badge variant="info">Installed</Badge>
<Badge variant="yellow">New</Badge>
```

All badges use uppercase, bold, letter-spacing. Use dot for live status indicators.

### Alert

```tsx
import { Alert } from "@/design-system/components/Alert";

<Alert variant="info" title="Tariff update coming">
  Your Smart Flex rate changes on 1 June 2026.
</Alert>
<Alert variant="error" title="Meter reading overdue" dismissible onDismiss={…}>
  Submit a reading to keep your bills accurate.
</Alert>
```

Left border accent, icon, title, body. Role="status" for info/success, role="alert" for warning/error.

### Typography

```tsx
import { Heading, Body, Lead, Caption, Label } from "@/design-system/components/Typography";

<Heading level="h1">Your clean energy dashboard</Heading>
<Lead>Track your usage, generation, and savings.</Lead>
<Body size="base">Standard body copy goes here.</Body>
<Caption>Prices exclude VAT. Subject to availability.</Caption>
<Label>Daily usage</Label>
```

### Energy metric components

**File:** `src/design-system/components/EnergyMetric/`

#### StatCard
Displays a single energy or cost metric with optional trend indicator.

```tsx
import { StatCard } from "@/design-system/components/EnergyMetric";

<StatCard
  label="Imported today"
  value="4.2"
  unit="kWh"
  variant="default"
  trend="down"
  trendLabel="12% less than yesterday"
/>
```

Variants: `default`, `yellow`, `dark`, `teal`, `green`

#### EnergyGauge
Circular SVG gauge for solar generation or battery level.

```tsx
<EnergyGauge value={72} max={100} label="Battery" unit="%" size="md" />
```

#### EnergyFlowBar
Horizontal segmented bar showing import / solar / export split.

```tsx
<EnergyFlowBar importKwh={4.2} solarKwh={8.7} exportKwh={3.5} />
```

### Navigation

#### TopNav
Sticky top navigation. Desktop shows inline links; mobile shows hamburger menu with slide-down drawer.

```tsx
import { TopNav } from "@/design-system/components/Navigation";

<TopNav items={[
  { label: "Dashboard", href: "/", active: true },
  { label: "Energy", href: "/energy" },
]} />
```

#### BottomTabBar
Fixed mobile bottom navigation (hides ≥768px). Use for the primary 4–5 app destinations.

```tsx
import { BottomTabBar } from "@/design-system/components/Navigation";

<BottomTabBar items={[
  { label: "Home", href: "/", icon: <HomeIcon />, active: true },
  { label: "Energy", href: "/energy", icon: <BoltIcon /> },
  { label: "Services", href: "/services", icon: <WrenchIcon /> },
  { label: "Account", href: "/account", icon: <PersonIcon /> },
]} />
```

---

## 9. Accessibility

Good Energy is committed to WCAG 2.1 AA compliance across all digital products.

### Requirements

- **Colour contrast:** Minimum 4.5:1 for body text, 3:1 for large text and UI components
- **Focus indicators:** 3px teal outline (`--color-teal`) on all interactive elements
- **Touch targets:** Minimum 48×48px (buttons, inputs, nav items)
- **Screen reader support:** All icons have `aria-hidden="true"`. Inputs have associated labels. Status changes use `role="alert"` or `aria-live`
- **Keyboard navigation:** Full tab order, escape to close modals/drawers, arrow keys for grouped controls
- **Reduced motion:** Wrap all animations in `@media (prefers-reduced-motion: reduce)`

### Font and layout accessibility

- Base font size: 16px minimum
- Body line height: 1.65 minimum
- Max line length: 70ch
- Never use yellow text on white or light grey on screen

### Testing checklist

- [ ] Tab through the entire page without a mouse
- [ ] Test with screen reader (VoiceOver / NVDA)
- [ ] Zoom to 200% — layout must not break
- [ ] Check contrast ratios with a tool (e.g. Colour Contrast Analyser)
- [ ] Test on a real mobile device

---

## 10. Photography & imagery

### Principles

| Principle | Description |
|---|---|
| **Be real** | Authentic people, real homes and workplaces. Natural lighting. No staged stock imagery. |
| **Be diverse** | At least 30% of people shown should be from black or minority backgrounds. Represent disability, age, sexual orientation, and gender identity. |
| **Be powerful** | Crisply focused. Bold colours. Interesting angles, shadows, reflections. |
| **Be practical** | Leave space in the composition for text overlays. |
| **Be environmentally aware** | Avoid farming imagery that looks green but isn't (e.g. rapeseed fields). |

### Photography categories

| Category | Primary use |
|---|---|
| **Powering home** | B2C — domestic customers, family life, real homes |
| **Powering business** | B2B — workplaces, commercial properties, sustainability-focused businesses |
| **Clean technology** | Heat pumps, solar panels, EV chargers in real installations |
| **Renewable generation** | Wind, solar, hydro farms; aerial and abstract angles |
| **UK nature** | Countryside, weather, seasonal landscapes (used sparingly) |

### Avoid

- Soppy, staged stock photos
- Homes that look like film sets
- Faded or desaturated colour treatment
- Rapeseed fields or misleading "green" imagery

### App image guidelines

- Use `next/image` for all images (automatic optimisation)
- Provide `alt` text always — descriptive, not decorative filler
- Prefer WebP format
- Supply 1x and 2x (for retina displays) where possible

---

## 11. Data visualisation

### Colour order

Use these colours in sequence when multiple data series are needed:

1. `#009BBF` — Teal (import)
2. `#FFDC14` — Yellow (solar)
3. `#00B889` — Green (export)
4. `#6FC3BB` — Sage
5. `#A8CB63` — Lime
6. `#44B06C` — Forest
7. `#AC2977` — Plum
8. `#614E9B` — Violet

If further values are needed, add grey tones.

### Chart rules

- **Pie/donut charts:** Best for showing percentage breakdowns (e.g. fuel mix, cost split)
- **Bar charts:** Best for comparing values over time or across categories. Use rounded tops.
- **Line charts:** Best for continuous time series (daily usage, tariff rate over time)
- **Gauge/arc charts:** Best for single metrics against a target (battery %, daily budget)

### Styling

- Labels: Sharp Sans No.2 Bold, tracking `0.03em`
- Grid lines: Light Grey `#E1E1E1`
- Background: White or Off-White for charts; Dark Grey for dark-mode dashboard
- Tooltips: Dark background, white text, rounded corners
- Axes: Dark Grey, no arrow heads

### Tables

Use for billing data and tariff comparisons. Rules:
- Primary palette only (no colour in table fills)
- Alternating row tint using Off-White
- Header: Semibold, Rich Black
- Data: Medium, Dark Grey
- Currency and units right-aligned

---

## 12. Design tokens reference

All tokens are defined in `src/design-system/tokens/tokens.css` (CSS custom properties) and `src/design-system/tokens/index.ts` (TypeScript).

### Quick reference

```css
/* Colours */
--color-yellow         #FFDC14
--color-rich-black     #020000
--color-dark-grey      #46413E
--color-mid-grey       #8B8784
--color-light-grey     #E1E1E1
--color-off-white      #F9F9F9
--color-white          #FFFFFF
--color-teal           #009BBF
--color-teal-dark      #0C657A
--color-green          #00B889
--color-error          #D93025

/* Typography */
--font-brand           "Sharp Sans No.2", var(--font-brand-loaded), Arial, sans-serif
--text-xs   12px  |  --text-sm 14px  |  --text-base 16px
--text-md   18px  |  --text-lg 20px  |  --text-xl   24px
--text-2xl  30px  |  --text-3xl 36px |  --text-4xl  48px

/* Spacing (4px base) */
--space-1  4px  |  --space-2  8px  |  --space-3  12px
--space-4  16px |  --space-6  24px |  --space-8  32px
--space-10 40px |  --space-12 48px |  --space-16 64px

/* Radius */
--radius-sm   4px   |  --radius-md  8px
--radius-lg   12px  |  --radius-xl  16px
--radius-full 9999px

/* Shadows */
--shadow-xs  |  --shadow-sm  |  --shadow-md  |  --shadow-lg

/* Transitions */
--duration-fast   150ms
--duration-normal 250ms
--duration-slow   400ms
--ease-default    cubic-bezier(0.4, 0, 0.2, 1)
```

---

*Good Energy Brand Guidelines 2025 — App implementation by the Good Energy product team.*
*For questions about brand use, contact the Content team.*
