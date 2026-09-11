import VerdictBadge from "./VerdictBadge.jsx";
import "./VerdictDetail.css";

export default function VerdictDetail({ record, onClose, inline = false }) {
  const content = (
    <div className={"verdictdetail" + (inline ? " verdictdetail--inline" : "")}>
      <div className="verdictdetail__head">
        <div>
          <div className="verdictdetail__filename">{record.fileName}</div>
          <div className="mono verdictdetail__hash">{record.sha256}</div>
        </div>
        <VerdictBadge status={record.status} label={record.label} />
      </div>

      <div className="verdictdetail__meter">
        <div className="verdictdetail__meter-track">
          <div
            className={`verdictdetail__meter-fill verdictdetail__meter-fill--${record.status}`}
            style={{ width: `${(record.detections / record.totalEngines) * 100}%` }}
          />
        </div>
        <span className="mono verdictdetail__meter-label">
          {record.detections} / {record.totalEngines} engines flagged this file
        </span>
      </div>

      <div className="verdictdetail__meta">
        <div>
          <span className="verdictdetail__metalabel">Family</span>
          <span className="mono">{record.family || "N/A"}</span>
        </div>
        <div>
          <span className="verdictdetail__metalabel">Confidence</span>
          <span className="mono">{record.confidence}%</span>
        </div>
        <div>
          <span className="verdictdetail__metalabel">Size</span>
          <span className="mono">{record.size}</span>
        </div>
      </div>

      <div className="verdictdetail__indicators">
        <span className="verdictdetail__metalabel">Behavioral indicators</span>
        <ul>
          {record.indicators.map((ind, i) => (
            <li key={i}>{ind}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (inline) return content;

  return (
    <div className="verdictdetail__overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="verdictdetail__card">
        {content}
        <button className="verdictdetail__close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
