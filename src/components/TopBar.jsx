import { useEffect, useState } from "react";
import "./TopBar.css";

export default function TopBar({ title }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{title}</h1>
      </div>
      <div className="topbar__right">
        <div className="topbar__clock mono">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
        <div className="topbar__analyst">
          <span className="topbar__avatar">SA</span>
          <span className="topbar__analystname">Analyst · Tier 2</span>
        </div>
      </div>
    </header>
  );
}
