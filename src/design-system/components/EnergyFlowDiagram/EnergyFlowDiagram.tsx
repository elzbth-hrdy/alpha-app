import React from "react";
import type { LiveData } from "@/lib/mock-data";
import styles from "./EnergyFlowDiagram.module.css";

export interface EnergyFlowDiagramProps {
  liveData: LiveData;
}

interface FlowPath {
  id: string;
  d: string;
  active: boolean;
  color: string;
  label: string;
}

// SVG coordinate helpers
const NODES = {
  solar:   { cx: 200, cy: 55 },
  battery: { cx: 320, cy: 175 },
  home:    { cx: 200, cy: 230 },
  grid:    { cx: 80,  cy: 175 },
};

const VBOX = "0 0 400 290";

function cubicPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

export function EnergyFlowDiagram({ liveData }: EnergyFlowDiagramProps) {
  const { solarKw, importKw, exportKw, batteryKw, homeLoadKw, batteryPercent } = liveData;

  const solarToHome    = solarKw > 0 && homeLoadKw > 0;
  const solarToBattery = solarKw > 0 && batteryKw > 0;
  const batteryToHome  = batteryKw < 0;
  const gridToHome     = importKw > 0;
  const homeToGrid     = exportKw > 0;

  const flows: FlowPath[] = [
    {
      id: "solar-home",
      d: cubicPath(NODES.solar.cx, NODES.solar.cy + 22, NODES.home.cx, NODES.home.cy - 22),
      active: solarToHome,
      color: "#00B889",
      label: "Generation powering home",
    },
    {
      id: "solar-battery",
      d: cubicPath(NODES.solar.cx + 20, NODES.solar.cy + 18, NODES.battery.cx - 15, NODES.battery.cy - 20),
      active: solarToBattery,
      color: "#00B889",
      label: "Generation charging battery",
    },
    {
      id: "battery-home",
      d: cubicPath(NODES.battery.cx - 20, NODES.battery.cy + 15, NODES.home.cx + 20, NODES.home.cy - 15),
      active: batteryToHome,
      color: "#00B889",
      label: "Battery powering home",
    },
    {
      id: "grid-home",
      d: cubicPath(NODES.grid.cx + 20, NODES.grid.cy + 15, NODES.home.cx - 20, NODES.home.cy - 15),
      active: gridToHome,
      color: "#FFDC14",
      label: "Grid power imported",
    },
    {
      id: "home-grid",
      d: cubicPath(NODES.home.cx - 20, NODES.home.cy - 15, NODES.grid.cx + 20, NODES.grid.cy + 15),
      active: homeToGrid,
      color: "#009BBF",
      label: "Exporting to grid",
    },
  ];

  const ariaLabel = [
    solarKw > 0 ? `Solar generating ${solarKw} kW.` : "Solar not generating.",
    importKw > 0 ? `Importing ${importKw} kW from the grid.` : "",
    exportKw > 0 ? `Exporting ${exportKw} kW to the grid.` : "",
    batteryKw > 0 ? `Battery charging at ${batteryKw} kW.` : batteryKw < 0 ? `Battery discharging at ${Math.abs(batteryKw)} kW.` : "",
    `Home consuming ${homeLoadKw} kW. Battery at ${batteryPercent}%.`,
  ].filter(Boolean).join(" ");

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox={VBOX}
        className={styles.svg}
        role="img"
        aria-label={`Live energy flow: ${ariaLabel}`}
      >
        {/* Flow paths */}
        {flows.map((flow) => (
          <React.Fragment key={flow.id}>
            {/* Background track */}
            <path
              d={flow.d}
              fill="none"
              stroke="#E1E1E1"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Active flow line */}
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

        {/* Nodes */}
        <FlowNode
          cx={NODES.solar.cx}
          cy={NODES.solar.cy}
          label="Solar"
          value={solarKw > 0 ? `${solarKw} kW` : "—"}
          active={solarKw > 0}
          activeColor="#00B889"
          icon={<SolarIcon />}
        />
        <FlowNode
          cx={NODES.battery.cx}
          cy={NODES.battery.cy}
          label="Battery"
          value={`${batteryPercent}%`}
          active={batteryKw !== 0}
          activeColor="#00B889"
          icon={<BatteryIcon />}
        />
        <FlowNode
          cx={NODES.home.cx}
          cy={NODES.home.cy}
          label="Home"
          value={`${homeLoadKw} kW`}
          active={homeLoadKw > 0}
          activeColor="#8B8784"
          icon={<HomeIcon />}
        />
        <FlowNode
          cx={NODES.grid.cx}
          cy={NODES.grid.cy}
          label="Grid"
          value={importKw > 0 ? `+${importKw} kW` : exportKw > 0 ? `−${exportKw} kW` : "—"}
          active={importKw > 0 || exportKw > 0}
          activeColor="#FFDC14"
          icon={<GridIcon />}
        />
      </svg>

      {/* Live values key */}
      <div className={styles.strip}>
        <StatPill label="Solar"      value={solarKw > 0 ? `${solarKw} kW` : "—"} color="#00B889" />
        <StatPill label="Import"     value={importKw > 0 ? `${importKw} kW` : "—"} color="#FFDC14" />
        <StatPill label="Export"     value={exportKw > 0 ? `${exportKw} kW` : "—"} color="#009BBF" />
        <StatPill label="Load"       value={`${homeLoadKw} kW`} color="#46413E" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Sub-components
   --------------------------------------------------------------------------- */

interface FlowNodeProps {
  cx: number;
  cy: number;
  label: string;
  value: string;
  active: boolean;
  activeColor: string;
  icon: React.ReactNode;
}

function FlowNode({ cx, cy, label, value, active, activeColor, icon }: FlowNodeProps) {
  const R = 28;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill={active ? activeColor + "22" : "#F9F9F9"}
        stroke={active ? activeColor : "#E1E1E1"}
        strokeWidth="2"
      />
      {/* Icon centred in node */}
      <foreignObject x={cx - 12} y={cy - 12} width="24" height="24">
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
      <text
        x={cx}
        y={cy + R + 14}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#46413E"
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + R + 26}
        textAnchor="middle"
        fontSize="10"
        fontWeight="500"
        fill="#8B8784"
      >
        {value}
      </text>
    </g>
  );
}

interface StatPillProps {
  label: string;
  value: string;
  color: string;
}

function StatPill({ label, value, color }: StatPillProps) {
  return (
    <div className={styles.pill}>
      <span className={styles.pillDot} style={{ background: color }} />
      <span className={styles.pillLabel}>{label}</span>
      <span className={styles.pillValue}>{value}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

function SolarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="5.5" width="13" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 7.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="8" width="5" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2.5 8.5L9 3l6.5 5.5V15.5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 16v-4.5h5V16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2v14M3 5.5l6-3.5 6 3.5M3 12.5l6 3.5 6-3.5M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
