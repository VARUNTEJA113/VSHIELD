import { useRef, useState } from "react";
import { generateScanRecord } from "../data/mockData.js";
import Panel from "../components/Panel.jsx";
import ScanTable from "../components/ScanTable.jsx";
import VerdictDetail from "../components/VerdictDetail.jsx";
import "./Scanner.css";

const STAGES = [
  "Reading file structure",
  "Unpacking sections",
  "Static signature match",
  "Behavioral emulation",
  "Cross-referencing threat feed",
  "Finalizing verdict",
];

export default function Scanner() {
  const [phase, setPhase] = useState("idle"); // idle | scanning | done
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const idRef = useRef(1);

  function startScan(name) {
    setFileName(name);
    setPhase("scanning");
    setProgress(0);
    setStageIdx(0);

    const totalMs = 2600;
    const tickMs = 80;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += tickMs;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setProgress(pct);
      setStageIdx(Math.min(STAGES.length - 1, Math.floor((pct / 100) * STAGES.length)));

      if (pct >= 100) {
        clearInterval(interval);
        const record = { ...generateScanRecord(idRef.current++), fileName: name };
        setResult(record);
        setHistory((h) => [record, ...h].slice(0, 8));
        setPhase("done");
      }
    }, tickMs);
  }

  function handleFiles(fileList) {
    const f = fileList && fileList[0];
    if (!f) return;
    startScan(f.name);
  }

  function reset() {
    setPhase("idle");
    setResult(null);
  }

  return (
    <div className="scanner">
      <Panel
        title="Submit a file for analysis"
        subtitle="Static + behavioral simulation — no file leaves your browser"
      >
        <div className="scanner__flip" data-phase={phase}>
          <div className="scanner__flipinner">
            {/* FRONT: dropzone */}
            <div className="scanner__face scanner__face--front">
              <div
                className={"dropzone" + (dragOver ? " is-dragover" : "")}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
              >
                <div className="dropzone__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 15V4M12 4 8 8M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 15v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="dropzone__title">Drop a file to analyze</div>
                <div className="dropzone__sub">or click to browse · simulated engine, sample data only</div>
                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
            </div>

            {/* SCANNING FACE */}
            <div className="scanner__face scanner__face--scan">
              <div className="scanning">
                <div className="scanning__ring">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" className="scanning__track" />
                    <circle
                      cx="50" cy="50" r="44"
                      className="scanning__progress"
                      style={{ strokeDashoffset: 276 - (276 * progress) / 100 }}
                    />
                  </svg>
                  <span className="scanning__pct mono">{progress}%</span>
                </div>
                <div className="scanning__filename mono">{fileName}</div>
                <div className="scanning__stage">{STAGES[stageIdx]}…</div>
              </div>
            </div>

            {/* RESULT FACE */}
            <div className="scanner__face scanner__face--result">
              {result && (
                <div className="scanresult">
                  <VerdictDetail record={result} inline />
                  <button className="scanresult__again" onClick={reset}>Scan another file</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Panel>

      {history.length > 0 && (
        <Panel title="This session's scans" subtitle="Local to this browser tab">
          <ScanTable rows={history} onSelect={(r) => setResult(r)} />
        </Panel>
      )}
    </div>
  );
}
