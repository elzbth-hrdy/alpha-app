/* =============================================================================
   Good Energy Alpha App — Mock Data
   Realistic data shapes for all features. Replace with real API calls.
   ============================================================================= */

// ─── Tariff / Time-of-Use ────────────────────────────────────────────────────

export type TariffRate = "cheap" | "standard" | "peak";

export interface TariffPeriod {
  startHour: number;
  endHour: number;
  rate: TariffRate;
  pencePerKwh: number;
  label: string;
}

export const tariffPeriods: TariffPeriod[] = [
  { startHour: 0,  endHour: 7,  rate: "cheap",    pencePerKwh: 8.5,  label: "Off-peak" },
  { startHour: 7,  endHour: 16, rate: "standard",  pencePerKwh: 24.5, label: "Standard" },
  { startHour: 16, endHour: 19, rate: "peak",      pencePerKwh: 38.0, label: "Evening peak" },
  { startHour: 19, endHour: 24, rate: "standard",  pencePerKwh: 24.5, label: "Standard" },
];

// ─── Charging Schedule ───────────────────────────────────────────────────────

export interface ChargeSlot {
  slotIndex: number;   // 0–47: 0 = 00:00–00:30, 47 = 23:30–24:00
  selected: boolean;
  rate: TariffRate;
  pencePerKwh: number;
}

function slotHour(slotIndex: number): number {
  return Math.floor(slotIndex / 2);
}

export function buildChargeSlots(selected?: number[]): ChargeSlot[] {
  return Array.from({ length: 48 }, (_, i) => {
    const hour = slotHour(i);
    const period = tariffPeriods.find(
      (p) => hour >= p.startHour && hour < p.endHour
    ) ?? tariffPeriods[0];
    return {
      slotIndex: i,
      selected: selected ? selected.includes(i) : (i >= 0 && i <= 13), // default: midnight–7am
      rate: period.rate,
      pencePerKwh: period.pencePerKwh,
    };
  });
}

export const defaultChargeSlots = buildChargeSlots();

// ─── Installed Technologies ──────────────────────────────────────────────────

export type TechType = "solar" | "battery" | "heatpump" | "ev";
export type TechStatus = "active" | "idle" | "charging" | "fault" | "offline";

export interface InstalledTech {
  id: string;
  type: TechType;
  name: string;
  installedDate: string;
  status: TechStatus;
  statusLabel: string;
  currentValueLabel: string;
  healthScore: number;
  lastServiceDate: string;
  metadata: Record<string, string>;
}

export const installedTech: InstalledTech[] = [
  {
    id: "solar-1",
    type: "solar",
    name: "Rooftop solar",
    installedDate: "12 Apr 2021",
    status: "active",
    statusLabel: "Generating",
    currentValueLabel: "3.2 kW now",
    healthScore: 94,
    lastServiceDate: "10 Mar 2025",
    metadata: { Capacity: "6 kWp", Panels: "16", Inverter: "SolarEdge SE6000" },
  },
  {
    id: "battery-1",
    type: "battery",
    name: "Home battery",
    installedDate: "1 Aug 2022",
    status: "charging",
    statusLabel: "Charging",
    currentValueLabel: "72% charged",
    healthScore: 87,
    lastServiceDate: "10 Mar 2025",
    metadata: { Capacity: "10 kWh", "Charge cycles": "412", Model: "GivEnergy 10kWh" },
  },
  {
    id: "heatpump-1",
    type: "heatpump",
    name: "Heat pump",
    installedDate: "20 Feb 2023",
    status: "active",
    statusLabel: "Running",
    currentValueLabel: "COP 3.8 avg",
    healthScore: 96,
    lastServiceDate: "5 Nov 2024",
    metadata: { Model: "Vaillant aroTHERM 7 kW", Mode: "Space heating", COP: "3.8" },
  },
  {
    id: "ev-1",
    type: "ev",
    name: "EV charger",
    installedDate: "15 Sep 2023",
    status: "idle",
    statusLabel: "Connected",
    currentValueLabel: "38% charged",
    healthScore: 100,
    lastServiceDate: "20 Jan 2025",
    metadata: { Type: "7.4 kW AC", Connector: "Type 2", Vehicle: "Nissan Leaf" },
  },
];

// ─── Live Data ───────────────────────────────────────────────────────────────

export interface LiveData {
  importKw: number;
  exportKw: number;
  solarKw: number;
  batteryKw: number;      // positive = charging, negative = discharging
  homeLoadKw: number;
  batteryPercent: number;
}

export const liveData: LiveData = {
  importKw: 0,
  exportKw: 1.1,
  solarKw: 3.2,
  batteryKw: 2.1,
  homeLoadKw: 2.0,
  batteryPercent: 72,
};

// ─── Account Balance ─────────────────────────────────────────────────────────

export interface AccountBalance {
  balancePounds: number;    // positive = in credit, negative = in debit
  lastUpdated: string;
  nextPaymentDate: string;
  nextPaymentPounds: number;
}

export const accountBalance: AccountBalance = {
  balancePounds: 47.32,
  lastUpdated: "19 May 2026",
  nextPaymentDate: "1 Jun 2026",
  nextPaymentPounds: 112.00,
};

// ─── EV Status ───────────────────────────────────────────────────────────────

export interface EVStatus {
  batteryPercent: number;
  targetPercent: number;
  vehicleKwh: number;
  chargerKw: number;
  vehicleName: string;
}

export const evStatus: EVStatus = {
  batteryPercent: 38,
  targetPercent: 80,
  vehicleKwh: 40,
  chargerKw: 7.4,
  vehicleName: "Nissan Leaf",
};

// ─── Time-Series helpers ─────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function rand(min: number, max: number, seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return min + (x - Math.floor(x)) * (max - min);
}

// Seasonal solar factor: peaks ~June/July (day 150–200), dips in winter
function solarFactor(dayOfYear: number): number {
  return 0.3 + 0.7 * Math.pow(Math.sin(Math.PI * (dayOfYear - 355) / 365 + Math.PI / 2), 2);
}

// ─── Hourly Data (today) ─────────────────────────────────────────────────────

export interface HourlyPoint {
  hour: number;
  label: string;
  importKwh: number;
  solarKwh: number;
  exportKwh: number;
  homeKwh: number;
}

export const todayHourly: HourlyPoint[] = Array.from({ length: 24 }, (_, hour) => {
  // Solar curve: bell shape peaking at noon
  const solar = hour >= 6 && hour <= 20
    ? clamp(2.8 * Math.sin(Math.PI * (hour - 6) / 14) + rand(-0.3, 0.3, hour * 7), 0, 3.8)
    : 0;
  const home = clamp(1.2 + rand(-0.4, 0.8, hour * 13) + (hour >= 7 && hour <= 9 ? 1.2 : 0) + (hour >= 17 && hour <= 21 ? 1.5 : 0), 0.3, 3.5);
  const selfConsume = Math.min(solar, home);
  const surplus = solar - selfConsume;
  const deficit = home - selfConsume;
  return {
    hour,
    label: `${String(hour).padStart(2, "0")}:00`,
    importKwh: Number(deficit.toFixed(2)),
    solarKwh: Number(solar.toFixed(2)),
    exportKwh: Number(surplus.toFixed(2)),
    homeKwh: Number(home.toFixed(2)),
  };
});

// ─── Daily Data (last 365 days) ──────────────────────────────────────────────

export interface DailyPoint {
  date: string;
  importKwh: number;
  solarKwh: number;
  exportKwh: number;
  homeKwh: number;
  costPence: number;
  earningsPence: number;
}

export const last365Days: DailyPoint[] = (() => {
  const today = new Date(2026, 4, 19); // 19 May 2026 (today per session)
  return Array.from({ length: 365 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (364 - i));
    const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
    const sf = solarFactor(dayOfYear);
    const solar = clamp(sf * 8.5 + rand(-1.2, 1.2, i * 3), 0.2, 11.0);
    const home  = clamp(8.5 - sf * 2.5 + rand(-1.0, 1.5, i * 7), 3.0, 14.0);
    const selfC = Math.min(solar, home);
    const imp   = Math.max(0, home - selfC);
    const exp   = Math.max(0, solar - selfC);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return {
      date: dateStr,
      importKwh: Number(imp.toFixed(2)),
      solarKwh: Number(solar.toFixed(2)),
      exportKwh: Number(exp.toFixed(2)),
      homeKwh: Number(home.toFixed(2)),
      costPence: Number((imp * 24.5 + (imp > 0 ? 45 : 0)).toFixed(0)),
      earningsPence: Number((exp * 15.0).toFixed(0)),
    };
  });
})();

// Aggregate helpers
export function aggregateWeek(): DailyPoint[] {
  return last365Days.slice(-7);
}

export function aggregateMonth(): DailyPoint[] {
  return last365Days.slice(-30);
}

export function aggregateYear(): DailyPoint[] {
  // Collapse to 12 monthly totals for readability
  const monthly: Record<string, DailyPoint> = {};
  for (const d of last365Days) {
    const key = d.date.slice(0, 7); // YYYY-MM
    if (!monthly[key]) {
      monthly[key] = { date: key, importKwh: 0, solarKwh: 0, exportKwh: 0, homeKwh: 0, costPence: 0, earningsPence: 0 };
    }
    monthly[key].importKwh   += d.importKwh;
    monthly[key].solarKwh    += d.solarKwh;
    monthly[key].exportKwh   += d.exportKwh;
    monthly[key].homeKwh     += d.homeKwh;
    monthly[key].costPence   += d.costPence;
    monthly[key].earningsPence += d.earningsPence;
  }
  return Object.values(monthly).map(m => ({
    ...m,
    importKwh: Number(m.importKwh.toFixed(1)),
    solarKwh:  Number(m.solarKwh.toFixed(1)),
    exportKwh: Number(m.exportKwh.toFixed(1)),
    homeKwh:   Number(m.homeKwh.toFixed(1)),
  }));
}

// Period totals
export function periodTotals(data: DailyPoint[] | HourlyPoint[]) {
  return (data as unknown as Array<Record<string, number>>).reduce(
    (acc, d) => ({
      import:   acc.import   + (d.importKwh ?? 0),
      solar:    acc.solar    + (d.solarKwh  ?? 0),
      export:   acc.export   + (d.exportKwh ?? 0),
      costPence: acc.costPence + (d.costPence ?? 0),
      earningsPence: acc.earningsPence + (d.earningsPence ?? 0),
    }),
    { import: 0, solar: 0, export: 0, costPence: 0, earningsPence: 0 }
  );
}

// ─── Year-over-Year Monthly Comparison ───────────────────────────────────────

export interface MonthlyYoY {
  month: string;       // "Jan", "Feb", ...
  thisYearKwh: number;
  lastYearKwh: number;
}

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const yoySolar: MonthlyYoY[] = MONTH_ABBR.map((month, idx) => {
  const sf = solarFactor(idx * 30 + 15);
  const thisYear = Number((sf * 210 + rand(-15, 15, idx * 11)).toFixed(0));
  const lastYear = Number((sf * 195 + rand(-20, 20, idx * 17)).toFixed(0));
  return { month, thisYearKwh: Math.max(10, thisYear), lastYearKwh: Math.max(10, lastYear) };
});

// ─── Local Benchmarks ────────────────────────────────────────────────────────

export interface LocalBenchmark {
  metric: string;
  yourValue: string;
  avgValue: string;
  betterByPercent: number;
  description: string;
  iconType: TechType | "co2";
}

export const localBenchmarks: LocalBenchmark[] = [
  {
    metric: "Solar yield",
    yourValue: "6.2 kWh/day avg",
    avgValue: "5.4 kWh/day avg",
    betterByPercent: 15,
    description: "Your 6 kWp system generates 15% more than similar installations nearby.",
    iconType: "solar",
  },
  {
    metric: "Heat pump efficiency",
    yourValue: "COP 3.8",
    avgValue: "COP 3.5",
    betterByPercent: 9,
    description: "Your heat pump runs 9% more efficiently than the local average.",
    iconType: "heatpump",
  },
  {
    metric: "Grid import",
    yourValue: "4.2 kWh/day",
    avgValue: "7.8 kWh/day",
    betterByPercent: 46,
    description: "You import 46% less from the grid than similar homes nearby.",
    iconType: "co2",
  },
];

// ─── Insights ────────────────────────────────────────────────────────────────

export type InsightType = "tip" | "comparison" | "saving" | "health";

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  body: string;
  actionLabel?: string;
}

export const insights: Insight[] = [
  {
    id: "insight-1",
    type: "saving",
    title: "£187 saved this year",
    body: "Smart scheduling and battery use have cut your grid import costs by £187 since January.",
  },
  {
    id: "insight-2",
    type: "tip",
    title: "Boost your export earnings",
    body: "Running your dishwasher at 2pm on sunny days could export an extra 0.8 kWh — worth around 12p per day.",
    actionLabel: "Set a reminder",
  },
  {
    id: "insight-3",
    type: "tip",
    title: "Pre-heat before the peak",
    body: "Setting your heat pump to run from 3pm (before the 4pm peak) could save £1.20 per week in winter.",
    actionLabel: "Adjust schedule",
  },
  {
    id: "insight-4",
    type: "health",
    title: "Battery at 87% capacity",
    body: "Your battery holds 87% of its original 10 kWh. This is normal for its age and no action is needed yet.",
  },
  {
    id: "insight-5",
    type: "comparison",
    title: "Above-average solar yield",
    body: "Your system generated 15% more than similar 6 kWp installations nearby last month.",
  },
];
