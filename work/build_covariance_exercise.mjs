import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/Users/Bryan/Documents/Codex/2026-07-17/new-chat/outputs/covariance_lesson_01";
const previewDir = "C:/Users/Bryan/Documents/Codex/2026-07-17/new-chat/work/covariance_previews";
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const workbook = Workbook.create();
const instructions = workbook.worksheets.add("Instructions");
const data = workbook.worksheets.add("Used Car Data");

instructions.showGridLines = false;
instructions.getRange("A1:F1").merge();
instructions.getRange("A1").values = [["Covariance Matrix — Mini Task"]];
instructions.getRange("A1:F1").format = {
  fill: "#17324D",
  font: { bold: true, color: "#FFFFFF", size: 16 },
  verticalAlignment: "center",
};
instructions.getRange("A1:F1").format.rowHeight = 34;

instructions.getRange("A3:F3").merge();
instructions.getRange("A3").values = [["Scenario"]];
instructions.getRange("A4:F5").merge();
instructions.getRange("A4").values = [[
  "You are helping a used-car marketplace understand how age, mileage, and price move together. Work in Python and explain what the results mean for a business analyst."
]];

instructions.getRange("A7:F7").merge();
instructions.getRange("A7").values = [["Your task"]];
instructions.getRange("A8:F13").values = [
  ["1", "Load the Used Car Data sheet into pandas.", null, null, null, null],
  ["2", "Before calculating, predict the sign of each pairwise covariance.", null, null, null, null],
  ["3", "Create the covariance matrix for age_years, mileage_km, and price_million_cop.", null, null, null, null],
  ["4", "Create the correlation matrix for the same variables.", null, null, null, null],
  ["5", "Compare both matrices and explain why their magnitudes differ.", null, null, null, null],
  ["6", "Identify the unusual observation and explain how it may affect the results.", null, null, null, null],
];
for (let row = 8; row <= 13; row++) instructions.getRange(`B${row}:F${row}`).merge();

instructions.getRange("A15:F15").merge();
instructions.getRange("A15").values = [["Submission"]];
instructions.getRange("A16:F18").merge();
instructions.getRange("A16").values = [[
  "Send your prediction, Python code, covariance matrix, correlation matrix, and a short interpretation. Do not remove the unusual car: analyze its effect first."
]];

for (const range of ["A3:F3", "A7:F7", "A15:F15"]) {
  instructions.getRange(range).format = {
    fill: "#DCEAF7",
    font: { bold: true, color: "#17324D" },
    borders: { preset: "outside", style: "thin", color: "#A7BDD1" },
  };
}
instructions.getRange("A4:F5").format = { wrapText: true, verticalAlignment: "center", fill: "#F7FAFC" };
instructions.getRange("A8:F13").format = { wrapText: true, verticalAlignment: "center" };
instructions.getRange("A16:F18").format = { wrapText: true, verticalAlignment: "center", fill: "#FFF7DF" };
instructions.getRange("A8:A13").format = { font: { bold: true, color: "#FFFFFF" }, fill: "#2A6F97", horizontalAlignment: "center", verticalAlignment: "center" };
instructions.getRange("A1:A18").format.columnWidth = 7;
instructions.getRange("B1:F18").format.columnWidth = 18;
instructions.getRange("A4:F18").format.rowHeight = 25;
instructions.getRange("A4:F5").format.rowHeight = 35;
instructions.getRange("A16:F18").format.rowHeight = 32;
instructions.freezePanes.freezeRows(1);

data.showGridLines = false;
data.getRange("A1:F13").values = [
  ["car_id", "age_years", "mileage_km", "price_million_cop", "category", "notes"],
  ["CAR-001", 1, 12000, 79, "standard", "Recent compact car"],
  ["CAR-002", 2, 26000, 72, "standard", "Recent sedan"],
  ["CAR-003", 3, 41000, 66, "standard", "Family vehicle"],
  ["CAR-004", 4, 61000, 58, "standard", "Regular use"],
  ["CAR-005", 5, 76000, 52, "standard", "Regular use"],
  ["CAR-006", 6, 98000, 46, "standard", "High mileage"],
  ["CAR-007", 7, 112000, 41, "standard", "High mileage"],
  ["CAR-008", 8, 129000, 36, "standard", "Older vehicle"],
  ["CAR-009", 9, 143000, 32, "standard", "Older vehicle"],
  ["CAR-010", 10, 161000, 28, "standard", "Older vehicle"],
  ["CAR-011", 12, 72000, 120, "collectible", "Rare restored model"],
  ["CAR-012", 4, 88000, 49, "standard", "Above-average use"],
];
const table = data.tables.add("A1:F13", true, "UsedCarData");
table.style = "TableStyleMedium2";
data.getRange("A1:F1").format = {
  fill: "#17324D",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
  verticalAlignment: "center",
};
data.getRange("B2:B13").format.numberFormat = "0";
data.getRange("C2:C13").format.numberFormat = "#,##0";
data.getRange("D2:D13").format.numberFormat = "0.0";
data.getRange("A1:A13").format.columnWidth = 13;
data.getRange("B1:B13").format.columnWidth = 12;
data.getRange("C1:C13").format.columnWidth = 15;
data.getRange("D1:D13").format.columnWidth = 19;
data.getRange("E1:E13").format.columnWidth = 15;
data.getRange("F1:F13").format.columnWidth = 24;
data.getRange("A1:F1").format.rowHeight = 31;
data.freezePanes.freezeRows(1);

const inspect = await workbook.inspect({
  kind: "table",
  range: "'Used Car Data'!A1:F13",
  include: "values,formulas",
  tableMaxRows: 15,
  tableMaxCols: 8,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["Instructions", "Used Car Data"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1.5, format: "png" });
  const fileName = sheetName.toLowerCase().replaceAll(" ", "_") + ".png";
  await fs.writeFile(`${previewDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/used_car_covariance_exercise.xlsx`);
