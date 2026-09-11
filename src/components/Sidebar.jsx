import "./Sidebar.css";

const ICONS = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="7.5" height="9" rx="1.4" />
      <rect x="13" y="3.5" width="7.5" height="5.5" rx="1.4" />
      <rect x="13" y="11.5" width="7.5" height="9" rx="1.4" />
      <rect x="3.5" y="15" width="7.5" height="5.5" rx="1.4" />
    </svg>
  ),
  scanner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 3.5H5.4A1.9 1.9 0 0 0 3.5 5.4V8" strokeLinecap="round" />
      <path d="M16 3.5h2.6a1.9 1.9 0 0 1 1.9 1.9V8" strokeLinecap="round" />
      <path d="M8 20.5H5.4a1.9 1.9 0 0 1-1.9-1.9V16" strokeLinecap="round" />
      <path d="M16 20.5h2.6a1.9 1.9 0 0 0 1.9-1.9V16" strokeLinecap="round" />
      <path d="M4 12h16" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  intel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 3.8v3M12 17.2v3M3.8 12h3M17.2 12h3" strokeLinecap="round" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 3.5h9l3.5 3.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M8.5 12h7M8.5 15.5h7M8.5 8.5h3.5" strokeLinecap="round" />
    </svg>
  ),
};

export default function Sidebar({ active, onSelect, views }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="var(--teal)" d="M12 2 3 6v6c0 5.2 3.8 9.9 9 11 5.2-1.1 9-5.8 9-11V6l-9-4Z" />
            <path fill="var(--bg-0)" d="m10.6 14.6-2.2-2.2 1.4-1.4 0.8 0.8 3-3 1.4 1.4-4.4 4.4Z" />
          </svg>
        </span>
        <span className="sidebar__brandtext">
          VSHIELD
          <em>Malware Analysis Console</em>
        </span>
      </div>

      <nav className="sidebar__nav">
        {Object.entries(views).map(([key, view]) => (
          <button
            key={key}
            className={"sidebar__item" + (active === key ? " is-active" : "")}
            onClick={() => onSelect(key)}
          >
            <span className="sidebar__icon">{ICONS[key]}</span>
            <span className="sidebar__label">{view.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__status">
        <span className="sidebar__pulse" />
        <span className="sidebar__statustext">Engine online</span>
      </div>
    </aside>
  );
}
