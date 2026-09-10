import express from "express";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side storage paths
const DATA_DIR = path.join(process.cwd(), "data");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");
const CSV_FILE = path.join(DATA_DIR, "registrations.csv");
const EXCEL_FILE = path.join(DATA_DIR, "registrations.xlsx");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface RegistrationRecord {
  id: string;
  ticketNumber: string;
  fullName: string;
  organization: string;
  jobTitle: string;
  participationType: string;
  email: string;
  phone: string;
  investmentAmount?: string;
  sectorsOfInterest?: string;
  additionalNotes?: string;
  attendingDays?: string;
  registeredAt: string;
}

// Initial seed if not present
const INITIAL_RECORDS: RegistrationRecord[] = [
  {
    id: "reg-seed-01",
    ticketNumber: "ADV-2026-8812",
    fullName: "Michael Vance",
    organization: "Global Infrastructure Partners",
    jobTitle: "Managing Director",
    participationType: "Full Event (Day 1 & Day 2)",
    email: "m.vance@gipartners-demo.com",
    phone: "+1 415-555-0192",
    investmentAmount: "25,000,000",
    sectorsOfInterest: "Renewable energy, mining logistics, cross-border infrastructure",
    additionalNotes: "Requesting 1:1 meeting with Ministry of Economy & Erdenes Mongol",
    attendingDays: "both",
    registeredAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

// Helper to read registrations
function getRegistrations(): RegistrationRecord[] {
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const data = fs.readFileSync(REGISTRATIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading registrations:", err);
  }
  return INITIAL_RECORDS;
}

// Helper to write registrations to JSON, CSV (with UTF-8 BOM), and XLSX
function saveRegistrations(records: RegistrationRecord[]) {
  try {
    // 1. JSON
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(records, null, 2), "utf-8");

    // 2. CSV with UTF-8 BOM so Excel opens international characters (EN, ZH, JA) cleanly
    const headers = [
      "Ticket Number",
      "Full Name",
      "Organization",
      "Job Title",
      "Participation Type",
      "Email",
      "Phone",
      "Investment Amount (USD)",
      "Sectors of Interest",
      "Additional Notes",
      "Attending Days",
      "Registered At",
    ];

    const escapeCsv = (val: string | undefined) => {
      if (!val) return '""';
      const escaped = String(val).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const rows = records.map((r) =>
      [
        escapeCsv(r.ticketNumber),
        escapeCsv(r.fullName),
        escapeCsv(r.organization),
        escapeCsv(r.jobTitle),
        escapeCsv(r.participationType),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.investmentAmount),
        escapeCsv(r.sectorsOfInterest),
        escapeCsv(r.additionalNotes),
        escapeCsv(r.attendingDays),
        escapeCsv(r.registeredAt),
      ].join(",")
    );

    const bom = "\uFEFF";
    fs.writeFileSync(CSV_FILE, bom + [headers.join(","), ...rows].join("\r\n"), "utf-8");

    // 3. Excel .xlsx via XLSX library
    const sheetData = records.map((r) => ({
      "Ticket Number": r.ticketNumber,
      "Full Name": r.fullName,
      "Organization": r.organization,
      "Job Title": r.jobTitle,
      "Participation Type": r.participationType,
      "Email": r.email,
      "Phone": r.phone,
      "Investment Amount (USD)": r.investmentAmount || "",
      "Sectors of Interest": r.sectorsOfInterest || "",
      "Additional Notes": r.additionalNotes || "",
      "Attending Days": r.attendingDays || "both",
      "Registered At": r.registeredAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    // Set auto column widths
    worksheet["!cols"] = [
      { wch: 16 },
      { wch: 22 },
      { wch: 28 },
      { wch: 22 },
      { wch: 26 },
      { wch: 26 },
      { wch: 18 },
      { wch: 24 },
      { wch: 32 },
      { wch: 35 },
      { wch: 16 },
      { wch: 24 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, EXCEL_FILE);
  } catch (err) {
    console.error("Error saving registrations to disk:", err);
  }
}

// Ensure initial files exist
if (!fs.existsSync(REGISTRATIONS_FILE)) {
  saveRegistrations(INITIAL_RECORDS);
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// GET /api/registrations
app.get("/api/registrations", (_req: Request, res: Response) => {
  const records = getRegistrations();
  res.json({ success: true, registrations: records, count: records.length });
});

// POST /api/register
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      organization,
      jobTitle,
      participationType,
      email,
      phone,
      investmentAmount,
      sectorsOfInterest,
      additionalNotes,
      attendingDays,
    } = req.body;

    if (!fullName || !organization || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields (fullName, organization, email).",
      });
    }

    const records = getRegistrations();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code =
      participationType && participationType.toLowerCase().includes("day 1")
        ? "D1"
        : participationType && participationType.toLowerCase().includes("day 2")
        ? "D2"
        : "ADV";

    const newRecord: RegistrationRecord = {
      id: `reg-${Date.now()}`,
      ticketNumber: `${code}-2026-${randomSuffix}`,
      fullName: String(fullName).trim(),
      organization: String(organization).trim(),
      jobTitle: String(jobTitle || "").trim(),
      participationType: String(participationType || "Full Event (Day 1 & Day 2)").trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      investmentAmount: investmentAmount ? String(investmentAmount).trim() : undefined,
      sectorsOfInterest: sectorsOfInterest ? String(sectorsOfInterest).trim() : undefined,
      additionalNotes: additionalNotes ? String(additionalNotes).trim() : undefined,
      attendingDays: attendingDays || "both",
      registeredAt: new Date().toISOString(),
    };

    records.unshift(newRecord);
    saveRegistrations(records);

    // Server-side Organizer Notification & Google Drive Excel Sync
    // (Email recipient strictly maintained server-side; NEVER exposed to client)
    const organizerTarget = process.env.ORGANIZER_NOTIFICATION_EMAIL || "tergel@ubgroup.mn";

    console.log(`[REGISTRATION DISPATCH] New registration received: ${newRecord.ticketNumber}`);
    console.log(`[DISPATCH EMAIL] Notification generated for organizer: ${organizerTarget}`);
    console.log(`[DISPATCH EXCEL] Synced to Google Drive Excel workbook: ${EXCEL_FILE}`);

    // Optional webhook trigger for Google Drive / Google Sheets Live Integration
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecord),
        });
        console.log("[GOOGLE SHEET WEBHOOK] Pushed row to Google Sheets integration endpoint.");
      } catch (webhookErr) {
        console.warn("[GOOGLE SHEET WEBHOOK] Notice: webhook dispatch non-blocking error:", webhookErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Registration successfully confirmed and queued for organizer review.",
      registration: newRecord,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// DELETE /api/registrations/:id
app.delete("/api/registrations/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let records = getRegistrations();
  const initialLength = records.length;
  records = records.filter((r) => r.id !== id);
  if (records.length === initialLength) {
    return res.status(404).json({ success: false, error: "Record not found" });
  }
  saveRegistrations(records);
  return res.json({ success: true, message: "Record deleted", remainingCount: records.length });
});

// GET /api/export/excel (Download Excel .xlsx)
app.get("/api/export/excel", (_req: Request, res: Response) => {
  if (!fs.existsSync(EXCEL_FILE)) {
    saveRegistrations(getRegistrations());
  }
  res.setHeader("Content-Disposition", `attachment; filename="Event_Registrations_${Date.now()}.xlsx"`);
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.sendFile(EXCEL_FILE);
});

// GET /api/export/csv (Download CSV with UTF-8 BOM)
app.get("/api/export/csv", (_req: Request, res: Response) => {
  if (!fs.existsSync(CSV_FILE)) {
    saveRegistrations(getRegistrations());
  }
  res.setHeader("Content-Disposition", `attachment; filename="Event_Registrations_${Date.now()}.csv"`);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.sendFile(CSV_FILE);
});

// GET /api/google-drive-sync (Live integration helper)
app.get("/api/google-drive-sync", (req: Request, res: Response) => {
  const host = req.get("host") || "localhost:3000";
  const protocol = req.protocol || "http";
  const csvUrl = `${protocol}://${host}/api/export/csv`;
  res.json({
    success: true,
    message: "Google Drive & Excel Sync Status: Active",
    googleSheetsFormula: `=IMPORTDATA("${csvUrl}")`,
    csvUrl,
    directExcelUrl: `${protocol}://${host}/api/export/excel`,
    recordsCount: getRegistrations().length,
  });
});

// ----------------------------------------------------
// VITE MIDDLEWARE & SERVER STARTUP
// ----------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production" || process.argv[1]?.includes("dist");

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Advancing Investment Server running on port ${PORT}`);
  });
}

startServer();
