import { useMemo, useState } from "react";
import Panel from "../components/Panel.jsx";
import StatCard from "../components/StatCard.jsx";
import ThreatRadar from "../components/ThreatRadar.jsx";
import ActivityFeed from "../components/ActivityFeed.jsx";
import TrendBars from "../components/TrendBars.jsx";
import ScanTable from "../components/ScanTable.jsx";
import VerdictDetail from "../components/VerdictDetail.jsx";
import { generateInitialScans, threatMapNodes, weeklyTrend } from "../data/mockData.js";
import "./Dashboard.css";

const ICONS = {
  scanned: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 3.5h9l3.5 3.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M8.5 12h7M8.5 15.5h5" strokeLinecap="round" />
    </svg>
  ),
  malicious: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2 3 6v6c0 5.2 3.8 9.9 9 11 5.2-1.1 9-5.8 9-11V6l-9-4Z" />
      <path d="m9.5 9.5 5 5m0-5-5 5" strokeLinecap="round" />
    </svg>
  ),
  quarantined: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="2.4" />
      <path d="M8.5 8.5h7v7h-7z" />
    </svg>
  ),
  endpoints: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="4.5" width="17" height="11" rx="1.6" />
      <path d="M9 20h6M12 15.5V20" strokeLinecap="round" />
    </svg>
  ),
};

export default function Dashboard() {
  const [scans] = useState(() => generateInitialScans(7));
  const [selected, setSelected] = useState(null);

  const stats = useMemo(() => {
    const malicious = scans.filter((s) => s.status === "malicious").length;
    return { total: scans.length, malicious };
  }, [scans]);

  return (
    <div className="dash">
      <div className="dash__stats">
        <StatCard label="Files scanned (24h)" value="4,812" delta="+6.2%" deltaTone="down" accent="teal" icon={ICONS.scanned} />
        <StatCard label="Malicious detections" value={String(128 + stats.malicious)} delta="+3.1%" deltaTone="up" accent="red" icon={ICONS.malicious} />
        <StatCard label="Quarantined samples" value="342" delta="-1.4%" deltaTone="down" accent="amber" icon={ICONS.quarantined} />
        <StatCard label="Endpoints protected" value="96" delta="stable" deltaTone="neutral" accent="green" icon={ICONS.endpoints} />
      </div>

      <div className="dash__grid">
        <Panel title="Global threat radar" subtitle="Live inbound indicators by origin" className="dash__radar">
          <ThreatRadar nodes={threatMapNodes} />
        </Panel>

        <Panel title="Detections — last 7 days" subtitle="Malicious + suspicious verdicts" className="dash__trend">
          <TrendBars values={weeklyTrend} />
        </Panel>

        <Panel title="Live activity" subtitle="Engine + endpoint events" className="dash__feed">
          <ActivityFeed />
        </Panel>
      </div>

      <Panel
        title="Recent scans"
        subtitle="Click a row for full analysis detail"
        className="dash__scans"
      >
        <ScanTable rows={scans} onSelect={setSelected} />
      </Panel>

      {selected && <VerdictDetail record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
