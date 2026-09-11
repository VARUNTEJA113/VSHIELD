import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Scanner from "./views/Scanner.jsx";
import ThreatIntel from "./views/ThreatIntel.jsx";
import Reports from "./views/Reports.jsx";
import "./App.css";

const VIEWS = {
  dashboard: { label: "Dashboard", component: Dashboard },
  scanner: { label: "File Scanner", component: Scanner },
  intel: { label: "Threat Intel", component: ThreatIntel },
  reports: { label: "Reports", component: Reports },
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const ActiveView = VIEWS[active].component;

  return (
    <div className="shell">
      <Sidebar active={active} onSelect={setActive} views={VIEWS} />
      <div className="shell__main">
        <TopBar title={VIEWS[active].label} />
        <div className="shell__content">
          <ActiveView />
        </div>
      </div>
    </div>
  );
}
