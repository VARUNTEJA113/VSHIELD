// All data here is simulated client-side for demo purposes.
// No real files are scanned and no real threat intelligence is queried.

const FAMILIES = [
  "Emotet.Loader", "Qakbot.Dropper", "Lockbit.Encryptor", "AgentTesla.Stealer",
  "Redline.Stealer", "Cobalt.Beacon", "Gootloader.JS", "IcedID.Bot",
  "Raccoon.Stealer", "Formbook.Injector",
];

const EXTENSIONS = [".exe", ".dll", ".ps1", ".js", ".doc", ".zip", ".bat", ".vbs"];

const FILE_NOUNS = [
  "invoice", "payroll_report", "setup", "update_patch", "quarterly_summary",
  "driver_install", "vpn_client", "resume", "shipping_label", "config_backup",
];

const COUNTRIES = ["US", "DE", "NL", "SG", "BR", "RU", "UA", "VN", "FR", "IN"];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

function hex(len) {
  let out = "";
  const chars = "0123456789abcdef";
  for (let i = 0; i < len; i++) out += chars[rand(0, 15)];
  return out;
}

export function randomHash() {
  return hex(64); // sha256-length
}

export function randomFileName() {
  return `${pick(FILE_NOUNS)}_${rand(100, 999)}${pick(EXTENSIONS)}`;
}

export function makeVerdict(fileName) {
  const roll = Math.random();
  if (roll < 0.42) {
    const detections = rand(38, 64);
    return {
      status: "malicious",
      label: "Malicious",
      family: pick(FAMILIES),
      detections,
      totalEngines: 70,
      confidence: rand(88, 99),
      indicators: [
        "Process hollowing detected in child process",
        "Attempts outbound connection to known C2 range",
        "Modifies registry Run keys for persistence",
        "Unpacks itself in memory at runtime",
        "Disables Windows Defender real-time protection",
      ].sort(() => Math.random() - 0.5).slice(0, rand(3, 5)),
    };
  }
  if (roll < 0.62) {
    const detections = rand(3, 12);
    return {
      status: "suspicious",
      label: "Suspicious",
      family: "Heuristic.Generic",
      detections,
      totalEngines: 70,
      confidence: rand(45, 74),
      indicators: [
        "Uses packed / obfuscated code section",
        "Requests elevated privileges on launch",
        "Contains suspicious string entropy in .text section",
        "Reaches out to a newly-registered domain",
      ].sort(() => Math.random() - 0.5).slice(0, rand(2, 3)),
    };
  }
  return {
    status: "clean",
    label: "Clean",
    family: null,
    detections: 0,
    totalEngines: 70,
    confidence: rand(96, 100),
    indicators: ["No known malicious signatures matched", "Static and behavioral checks passed"],
  };
}

export function generateScanRecord(id) {
  const fileName = randomFileName();
  const verdict = makeVerdict(fileName);
  return {
    id,
    fileName,
    sha256: randomHash(),
    size: `${(Math.random() * 12 + 0.2).toFixed(1)} MB`,
    time: `${rand(1, 58)}m ago`,
    ...verdict,
  };
}

export function generateInitialScans(count = 8) {
  return Array.from({ length: count }, (_, i) => generateScanRecord(i + 1));
}

export function generateActivityEvent(id) {
  const kinds = [
    { type: "block", text: `Blocked outbound C2 beacon from ${pick(COUNTRIES)} relay` },
    { type: "quarantine", text: `Quarantined ${pick(FAMILIES)} sample on endpoint WKS-${rand(100, 999)}` },
    { type: "scan", text: `Completed scan of ${randomFileName()}` },
    { type: "alert", text: `New YARA match: ${pick(FAMILIES)} on file share \\\\SRV-${rand(10, 40)}` },
    { type: "info", text: `Threat feed sync completed — ${rand(120, 480)} new IOCs ingested` },
  ];
  const ev = pick(kinds);
  return { id, ...ev, time: `${rand(1, 45)}s ago` };
}

export const threatMapNodes = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  country: COUNTRIES[i % COUNTRIES.length],
  severity: pick(["low", "medium", "high", "critical"]),
  count: rand(2, 240),
}));

export const weeklyTrend = [14, 22, 18, 31, 27, 40, rand(30, 46)];
