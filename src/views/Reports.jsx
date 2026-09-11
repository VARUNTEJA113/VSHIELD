import { useMemo, useState } from "react";
import Panel from "../components/Panel.jsx";
import ScanTable from "../components/ScanTable.jsx";
import VerdictDetail from "../components/VerdictDetail.jsx";
import { generateInitialScans } from "../data/mockData.js";
import "./Reports.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "malicious", label: "Malicious" },
  { key: "suspicious", label: "Suspicious" },
  { key: "clean", label: "Clean" },
];

export default function Reports() {
  const [scans] = useState(() => generateInitialScans(22));
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => (filter === "all" ? scans : scans.filter((s) => s.status === filter)),
    [scans, filter]
  );

  return (
    <div className="reports">
      <Panel
        title="Scan history"
        subtitle={`${filtered.length} record${filtered.length === 1 ? "" : "s"}`}
        action={
          <div className="reports__filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={"reports__filter" + (filter === f.key ? " is-active" : "")}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        <ScanTable rows={filtered} onSelect={setSelected} />
      </Panel>

      {selected && <VerdictDetail record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
