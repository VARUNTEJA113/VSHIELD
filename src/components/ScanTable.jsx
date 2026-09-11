import VerdictBadge from "./VerdictBadge.jsx";
import "./ScanTable.css";

function truncateHash(hash) {
  return `${hash.slice(0, 10)}…${hash.slice(-8)}`;
}

export default function ScanTable({ rows, onSelect }) {
  return (
    <div className="scantable">
      <div className="scantable__row scantable__row--head">
        <span>File</span>
        <span>SHA-256</span>
        <span>Family</span>
        <span>Verdict</span>
        <span>Size</span>
        <span>Time</span>
      </div>
      {rows.map((r) => (
        <button
          className="scantable__row scantable__row--body"
          key={r.id}
          onClick={() => onSelect && onSelect(r)}
        >
          <span className="scantable__file">{r.fileName}</span>
          <span className="mono scantable__hash">{truncateHash(r.sha256)}</span>
          <span className="scantable__family">{r.family || "—"}</span>
          <span><VerdictBadge status={r.status} label={r.label} /></span>
          <span className="mono">{r.size}</span>
          <span className="mono scantable__time">{r.time}</span>
        </button>
      ))}
    </div>
  );
}
