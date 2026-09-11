import "./TrendBars.css";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function TrendBars({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="trend">
      {values.map((v, i) => (
        <div className="trend__col" key={i}>
          <div className="trend__bar-track">
            <div
              className="trend__bar"
              style={{ height: `${(v / max) * 100}%` }}
            />
          </div>
          <span className="trend__label">{DAYS[i]}</span>
        </div>
      ))}
    </div>
  );
}
