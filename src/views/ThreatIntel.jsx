import { useMemo } from "react";
import Panel from "../components/Panel.jsx";
import { randomHash, threatMapNodes } from "../data/mockData.js";
import "./ThreatIntel.css";

const FAMILIES = [
  { name: "Emotet.Loader", type: "Trojan / Loader", count: 812, severity: "critical" },
  { name: "Redline.Stealer", type: "Infostealer", count: 604, severity: "high" },
  { name: "Lockbit.Encryptor", type: "Ransomware", count: 388, severity: "critical" },
  { name: "Cobalt.Beacon", type: "C2 Framework", count: 271, severity: "high" },
  { name: "Gootloader.JS", type: "Downloader", count: 194, severity: "medium" },
  { name: "Formbook.Injector", type: "Infostealer", count: 142, severity: "medium" },
];

const SEVERITY_COLOR = { critical: "var(--red)", high: "var(--amber)", medium: "var(--blue)", low: "var(--teal)" };

export default function ThreatIntel() {
  const iocs = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        hash: randomHash(),
        type: ["SHA-256", "Domain", "IP", "URL"][i % 4],
        source: ["Community feed", "Internal EDR", "Partner ISAC", "OSINT crawl"][i % 4],
        seen: `${Math.floor(Math.random() * 12) + 1}h ago`,
      })),
    []
  );

  const maxCount = Math.max(...FAMILIES.map((f) => f.count));

  return (
    <div className="intel">
      <div className="intel__grid">
        <Panel title="Top active families" subtitle="Ranked by detections this week">
          <div className="familylist">
            {FAMILIES.map((f) => (
              <div className="familylist__row" key={f.name}>
                <div className="familylist__meta">
                  <span className="familylist__name mono">{f.name}</span>
                  <span className="familylist__type">{f.type}</span>
                </div>
                <div className="familylist__bar-track">
                  <div
                    className="familylist__bar"
                    style={{ width: `${(f.count / maxCount) * 100}%`, background: SEVERITY_COLOR[f.severity] }}
                  />
                </div>
                <span className="mono familylist__count">{f.count}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Origin severity" subtitle="Inbound indicator sources">
          <div className="originlist">
            {threatMapNodes.map((n) => (
              <div className="originlist__row" key={n.id}>
                <span className="originlist__dot" style={{ background: SEVERITY_COLOR[n.severity] }} />
                <span className="mono originlist__country">{n.country}</span>
                <span className="originlist__sev">{n.severity}</span>
                <span className="mono originlist__count">{n.count}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent indicators of compromise" subtitle="Aggregated from connected feeds">
        <div className="ioclist">
          <div className="ioclist__row ioclist__row--head">
            <span>Indicator</span>
            <span>Type</span>
            <span>Source</span>
            <span>Last seen</span>
          </div>
          {iocs.map((ioc) => (
            <div className="ioclist__row" key={ioc.id}>
              <span className="mono ioclist__hash">{ioc.hash.slice(0, 34)}…</span>
              <span>{ioc.type}</span>
              <span className="ioclist__source">{ioc.source}</span>
              <span className="mono ioclist__seen">{ioc.seen}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
