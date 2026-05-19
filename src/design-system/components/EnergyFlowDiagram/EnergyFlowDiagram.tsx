import React from "react";
import type { LiveData } from "@/lib/mock-data";
import styles from "./EnergyFlowDiagram.module.css";

export interface EnergyFlowDiagramProps {
  liveData: LiveData;
}

// ── Node positions (hub-and-spoke, home at centre) ────────────────────────────
const N = {
  solar:     { cx: 250, cy: 32  },
  battery:   { cx: 395, cy: 97  },
  ev:        { cx: 395, cy: 218 },
  heatpump:  { cx: 105, cy: 218 },
  grid:      { cx: 105, cy: 97  },
  home:      { cx: 250, cy: 155 },
} as const;

const HOME_R  = 40;
const NODE_R  = 26;
const VBOX    = "0 0 500 315";

// Compute an edge-to-edge cubic bezier path between two nodes
function edgePath(
  x1: number, y1: number, r1: number,
  x2: number, y2: number, r2: number,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / dist;
  const uy = dy / dist;
  const sx = x1 + ux * (r1 + 3);
  const sy = y1 + uy * (r1 + 3);
  const ex = x2 - ux * (r2 + 3);
  const ey = y2 - uy * (r2 + 3);
  const my = (sy + ey) / 2;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${sx.toFixed(1)} ${my.toFixed(1)}, ${ex.toFixed(1)} ${my.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

interface FlowDef {
  id: string;
  d: string;
  active: boolean;
  color: string;
  label: string;
}

export function EnergyFlowDiagram({ liveData }: EnergyFlowDiagramProps) {
  const { solarKw, importKw, exportKw, batteryKw, homeLoadKw, batteryPercent, evKw, heatPumpKw } = liveData;

  const solarToHome     = solarKw > 0 && homeLoadKw > 0;
  const solarToBattery  = solarKw > 0 && batteryKw > 0;
  const batteryToHome   = batteryKw < 0;
  const gridToHome      = importKw > 0;
  const homeToGrid      = exportKw > 0;
  const homeToEv        = evKw > 0;
  const homeToHeatPump  = heatPumpKw > 0;

  const flows: FlowDef[] = [
    {
      id: "solar-home",
      d: edgePath(N.solar.cx, N.solar.cy, NODE_R, N.home.cx, N.home.cy, HOME_R),
      active: solarToHome,
      color: "#00B889",
      label: "Solar powering home",
    },
    {
      id: "solar-battery",
      d: edgePath(N.solar.cx, N.solar.cy, NODE_R, N.battery.cx, N.battery.cy, NODE_R),
      active: solarToBattery,
      color: "#00B889",
      label: "Solar charging battery",
    },
    {
      id: "battery-home",
      d: edgePath(N.battery.cx, N.battery.cy, NODE_R, N.home.cx, N.home.cy, HOME_R),
      active: batteryToHome,
      color: "#00B889",
      label: "Battery powering home",
    },
    {
      id: "grid-home",
      d: edgePath(N.grid.cx, N.grid.cy, NODE_R, N.home.cx, N.home.cy, HOME_R),
      active: gridToHome,
      color: "#FFDC14",
      label: "Importing from grid",
    },
    {
      id: "home-grid",
      d: edgePath(N.home.cx, N.home.cy, HOME_R, N.grid.cx, N.grid.cy, NODE_R),
      active: homeToGrid,
      color: "#009BBF",
      label: "Exporting to grid",
    },
    {
      id: "home-ev",
      d: edgePath(N.home.cx, N.home.cy, HOME_R, N.ev.cx, N.ev.cy, NODE_R),
      active: homeToEv,
      color: "#00B889",
      label: "Charging EV",
    },
    {
      id: "home-heatpump",
      d: edgePath(N.home.cx, N.home.cy, HOME_R, N.heatpump.cx, N.heatpump.cy, NODE_R),
      active: homeToHeatPump,
      color: "#00B889",
      label: "Powering heat pump",
    },
  ];

  const ariaLabel = [
    solarKw > 0 ? `Solar generating ${solarKw} kW.` : "Solar not generating.",
    importKw > 0 ? `Importing ${importKw} kW from grid.` : "",
    exportKw > 0 ? `Exporting ${exportKw} kW to grid.` : "",
    batteryKw > 0 ? `Battery charging at ${batteryKw} kW.` : batteryKw < 0 ? `Battery discharging at ${Math.abs(batteryKw)} kW.` : "",
    evKw > 0 ? `EV charging at ${evKw} kW.` : "",
    heatPumpKw > 0 ? `Heat pump running at ${heatPumpKw} kW.` : "",
    `Home consuming ${homeLoadKw} kW total.`,
  ].filter(Boolean).join(" ");

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox={VBOX}
        className={styles.svg}
        role="img"
        aria-label={`Live energy flow: ${ariaLabel}`}
      >
        {/* ── Flow paths ──────────────────────────────────────────────── */}
        {flows.map((flow) => (
          <React.Fragment key={flow.id}>
            <path
              d={flow.d}
              fill="none"
              stroke="#E1E1E1"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {flow.active && (
              <path
                d={flow.d}
                fill="none"
                stroke={flow.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className={styles.flowLine}
              />
            )}
          </React.Fragment>
        ))}

        {/* ── Peripheral nodes ────────────────────────────────────────── */}
        <SatelliteNode
          cx={N.solar.cx} cy={N.solar.cy}
          label="Solar"
          value={solarKw > 0 ? `${solarKw} kW` : "—"}
          active={solarKw > 0}
          activeColor="#00B889"
          icon={<SolarIcon />}
        />
        <SatelliteNode
          cx={N.battery.cx} cy={N.battery.cy}
          label="Battery"
          value={`${batteryPercent}%`}
          active={batteryKw !== 0}
          activeColor="#00B889"
          icon={<BatteryIcon />}
        />
        <SatelliteNode
          cx={N.ev.cx} cy={N.ev.cy}
          label="EV"
          value={evKw > 0 ? `${evKw} kW` : "Ready"}
          active={evKw > 0}
          activeColor="#009BBF"
          icon={<EVIcon />}
        />
        <SatelliteNode
          cx={N.heatpump.cx} cy={N.heatpump.cy}
          label="Heat pump"
          value={heatPumpKw > 0 ? `${heatPumpKw} kW` : "Idle"}
          active={heatPumpKw > 0}
          activeColor="#009BBF"
          icon={<HeatPumpIcon />}
        />
        <SatelliteNode
          cx={N.grid.cx} cy={N.grid.cy}
          label="Grid"
          value={importKw > 0 ? `+${importKw} kW` : exportKw > 0 ? `−${exportKw} kW` : "—"}
          active={importKw > 0 || exportKw > 0}
          activeColor="#FFDC14"
          icon={<GridIcon />}
        />

        {/* ── Home (centre node — larger, illustrative) ───────────────── */}
        <HomeNode
          cx={N.home.cx} cy={N.home.cy}
          loadKw={homeLoadKw}
        />
      </svg>

    </div>
  );
}

/* ── Home centre node ─────────────────────────────────────────────────────── */

function HomeNode({ cx, cy, loadKw }: { cx: number; cy: number; loadKw: number }) {
  const R = HOME_R;
  // Outer glow ring
  return (
    <g>
      {/* Glow ring */}
      <circle cx={cx} cy={cy} r={R + 10} fill="none" stroke="#E1E1E1" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Node fill */}
      <circle cx={cx} cy={cy} r={R} fill="#F9F9F9" stroke="#46413E" strokeWidth="2" />
      {/* House shape inside the node */}
      <g transform={`translate(${cx - 16}, ${cy - 18})`}>
        {/* House roof */}
        <path
          d="M 16 2 L 30 13 L 27 13 L 27 28 L 5 28 L 5 13 L 2 13 Z"
          fill="none"
          stroke="#46413E"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Door */}
        <rect x="12" y="19" width="8" height="9" rx="1.5" fill="none" stroke="#46413E" strokeWidth="1.6" />
      </g>
      {/* Label */}
      <text x={cx} y={cy + R + 15} textAnchor="middle" fontSize="12" fontWeight="700" fill="#46413E">
        Home
      </text>
      <text x={cx} y={cy + R + 27} textAnchor="middle" fontSize="10" fontWeight="500" fill="#8B8784">
        {loadKw} kW
      </text>
    </g>
  );
}

/* ── Satellite node ───────────────────────────────────────────────────────── */

interface SatelliteNodeProps {
  cx: number;
  cy: number;
  label: string;
  value: string;
  active: boolean;
  activeColor: string;
  icon: React.ReactNode;
}

function SatelliteNode({ cx, cy, label, value, active, activeColor, icon }: SatelliteNodeProps) {
  const R = NODE_R;
  return (
    <g>
      <circle
        cx={cx} cy={cy} r={R}
        fill={active ? activeColor + "22" : "#F9F9F9"}
        stroke={active ? activeColor : "#E1E1E1"}
        strokeWidth="2"
      />
      <foreignObject x={cx - 11} y={cy - 11} width="22" height="22">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            color: active ? activeColor : "#8B8784",
          }}
        >
          {icon}
        </div>
      </foreignObject>
      <text x={cx} y={cy + R + 13} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#46413E">
        {label}
      </text>
      <text x={cx} y={cy + R + 24} textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#8B8784">
        {value}
      </text>
    </g>
  );
}

/* ── Icons ────────────────────────────────────────────────────────────────── */

function SolarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="1" x2="9" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="14.5" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="9" x2="3.5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14.5" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.4" y1="3.4" x2="5.2" y2="5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.8" y1="12.8" x2="14.6" y2="14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.4" y1="14.6" x2="5.2" y2="12.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.8" y1="5.2" x2="14.6" y2="3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="5.5" width="13" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 7.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="8" width="5" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function EVIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="5.5" width="15" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 8.5L7.5 11.5h3.5L9 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeatPumpIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="11" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="11" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="11" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2v14M3 5.5l6-3.5 6 3.5M3 12.5l6 3.5 6-3.5M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
