import { useEffect, useRef, useState } from "react";
import { generateActivityEvent } from "../data/mockData.js";
import "./ActivityFeed.css";

const TYPE_META = {
  block: { color: "var(--red)", label: "BLOCK" },
  quarantine: { color: "var(--amber)", label: "QTN" },
  scan: { color: "var(--teal)", label: "SCAN" },
  alert: { color: "var(--red)", label: "ALERT" },
  info: { color: "var(--blue)", label: "INFO" },
};

export default function ActivityFeed() {
  const [events, setEvents] = useState(() =>
    Array.from({ length: 6 }, (_, i) => generateActivityEvent(i))
  );
  const idRef = useRef(6);

  useEffect(() => {
    const id = setInterval(() => {
      setEvents((prev) => {
        const next = generateActivityEvent(idRef.current++);
        return [next, ...prev].slice(0, 14);
      });
    }, 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="feed">
      <div className="feed__list">
        {events.map((ev) => {
          const meta = TYPE_META[ev.type];
          return (
            <div className="feed__row" key={ev.id}>
              <span className="feed__badge mono" style={{ color: meta.color, borderColor: meta.color }}>
                {meta.label}
              </span>
              <span className="feed__text">{ev.text}</span>
              <span className="feed__time mono">{ev.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
