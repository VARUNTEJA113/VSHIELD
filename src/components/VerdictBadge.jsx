import "./VerdictBadge.css";

export default function VerdictBadge({ status, label }) {
  return <span className={`verdict verdict--${status}`}>{label}</span>;
}
