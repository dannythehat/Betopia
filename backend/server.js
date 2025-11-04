import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

const HOST = "127.0.0.1";
const PORT = 8081;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT_DIR   = path.resolve(__dirname, "..");
const DATA_DIR   = path.join(ROOT_DIR, "data");
const PUBLIC_DIR = path.join(__dirname, "public");

const app = express();

// Basic CORS (MVP): allow local frontends
app.use(cors({
  origin: [/^http:\/\/localhost:3000$/, /^http:\/\/127\.0\.0\.1:3000$/, /^http:\/\/127\.0\.0\.1:8081$/, /^http:\/\/localhost:8081$/],
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    name: "FootballBettingBuddi API",
    message: "Minimal API is running",
    time_utc: new Date().toISOString()
  });
});

// Helper: get YYYY-MM-DD in Europe/Sofia
function sofiaTodayISO() {
  const fmt = new Intl.DateTimeFormat("bg-BG", { timeZone: "Europe/Sofia", year: "numeric", month: "2-digit", day: "2-digit" });
  const parts = fmt.formatToParts(new Date());
  const y = parts.find(p => p.type === "year").value;
  const m = parts.find(p => p.type === "month").value.padStart(2,"0");
  const d = parts.find(p => p.type === "day").value.padStart(2,"0");
  return `${y}-${m}-${d}`;
}

// API: return today's Smart Bets file (Europe/Sofia)
app.get("/api/smart-bets", async (req, res) => {
  const date = sofiaTodayISO();
  const filePath = path.join(DATA_DIR, `smartbets-${date}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);
    res.json(json);
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).json({ status: "error", message: `No smartbets file for ${date}` });
    }
    console.error("smart-bets error:", err);
    res.status(500).json({ status: "error", message: "Failed to load smart bets." });
  }
});

// Static site
app.use(express.static(PUBLIC_DIR));

// Root info (fallback)
app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Minimal API listening on http://${HOST}:${PORT}`);
  console.log(`Health: http://${HOST}:${PORT}/api/health`);
  console.log(`UI:     http://${HOST}:${PORT}/`);
  console.log(`Bets:   http://${HOST}:${PORT}/api/smart-bets`);
});
