import { useMemo } from "react";
import "./ThreatRadar.css";

const SEVERITY_COLOR = {
  critical: "var(--red)",
  high: "var(--amber)",
  medium: "var(--blue)",
  low: "var(--teal)",
};

export default function ThreatRadar({ nodes }) {
  const radius = 108;

  const points = useMemo(() => {
    const n = nodes.length;
    return nodes.map((node, i) => {
      // distribute roughly evenly on a sphere (golden-angle spiral)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return { ...node, x, y, z };
    });
  }, [nodes]);

  return (
    <div className="radar">
      <div className="radar__stage">
        <div className="radar__globe">
          <div className="radar__ring radar__ring--a" />
          <div className="radar__ring radar__ring--b" />
          <div className="radar__ring radar__ring--c" />
          <div className="radar__core">
            <div className="radar__core-pulse" />
          </div>
          {points.map((p) => (
            <div
              key={p.id}
              className="radar__node"
              style={{ transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)` }}
            >
              <div className="radar__node-billboard">
                <span
                  className="radar__dot"
                  style={{
                    background: SEVERITY_COLOR[p.severity],
                    boxShadow: `0 0 10px 1px ${SEVERITY_COLOR[p.severity]}`,
                  }}
                />
                <span className="radar__tag mono">{p.country}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="radar__legend">
        {Object.entries(SEVERITY_COLOR).map(([sev, color]) => (
          <span className="radar__legenditem" key={sev}>
            <span className="radar__legenddot" style={{ background: color }} />
            {sev}
          </span>
        ))}
      </div>
    </div>
  );
}
