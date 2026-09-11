import { useRef } from "react";
import "./StatCard.css";

export default function StatCard({ label, value, delta, deltaTone = "neutral", accent = "teal", icon }) {
  const cardRef = useRef(null);

  function handleMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    el.style.setProperty("--rx", `${rotateX}deg`);
    el.style.setProperty("--ry", `${rotateY}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }

  return (
    <div
      className={`statcard statcard--${accent}`}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="statcard__glow" />
      <div className="statcard__top">
        <span className="statcard__icon">{icon}</span>
        {delta && <span className={`statcard__delta statcard__delta--${deltaTone}`}>{delta}</span>}
      </div>
      <div className="statcard__value mono">{value}</div>
      <div className="statcard__label">{label}</div>
    </div>
  );
}
