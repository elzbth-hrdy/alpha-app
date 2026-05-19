/* =============================================================================
   Good Energy Design Tokens — TypeScript
   Use these in component logic, theming, and testing.
   ============================================================================= */

export const colors = {
  // Primary palette
  yellow:        "#FFDC14",
  yellowHover:   "#F0CE00",
  yellowMuted:   "#FFF6B3",
  richBlack:     "#020000",
  darkGrey:      "#46413E",
  midGrey:       "#8B8784",
  lightGrey:     "#E1E1E1",
  offWhite:      "#F9F9F9",
  white:         "#FFFFFF",

  // Supporting palette
  teal:              "#009BBF",
  tealDark:          "#0C657A",
  tealForest:        "#00464C",
  turquoise:         "#52B8D0",
  turquoiseLight:    "#A8DCE8",
  green:             "#00B889",
  greenMid:          "#6FC3BB",
  greenDark:         "#4A7F7A",
  greenPale:         "#9CD4CF",
  greenMist:         "#CEEAE7",

  // Semantic
  success:    "#00B889",
  successBg:  "#E6F9F4",
  warning:    "#FFDC14",
  warningBg:  "#FFFCE6",
  error:      "#D93025",
  errorBg:    "#FDECEA",
  info:       "#009BBF",
  infoBg:     "#E5F5FA",

  // Data visualisation
  dataviz: {
    teal:   "#009BBF",
    sage:   "#6FC3BB",
    lime:   "#A8CB63",
    forest: "#44B06C",
    plum:   "#AC2977",
    violet: "#614E9B",
  },
} as const;

export const typography = {
  fontBrand:  '"Sharp Sans No.2", "Plus Jakarta Sans", Arial, system-ui, sans-serif',
  fontSystem: "Arial, Helvetica, system-ui, sans-serif",
  fontMono:   '"JetBrains Mono", "Fira Code", ui-monospace, monospace',

  // Font weights
  weights: {
    book:     300,
    medium:   500,
    semibold: 600,
    bold:     700,
  },

  // Scale in rem
  scale: {
    xs:   "0.75rem",
    sm:   "0.875rem",
    base: "1rem",
    md:   "1.125rem",
    lg:   "1.25rem",
    xl:   "1.5rem",
    "2xl": "1.875rem",
    "3xl": "2.25rem",
    "4xl": "3rem",
    "5xl": "3.75rem",
  },
} as const;

export const spacing = {
  0:  "0px",
  1:  "0.25rem",
  2:  "0.5rem",
  3:  "0.75rem",
  4:  "1rem",
  5:  "1.25rem",
  6:  "1.5rem",
  8:  "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const radii = {
  sm:   "0.25rem",
  md:   "0.5rem",
  lg:   "0.75rem",
  xl:   "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;
