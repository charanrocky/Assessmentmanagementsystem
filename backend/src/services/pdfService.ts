import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { resolvePath } from "../utils/jsonPathHelper";

function safe(val: any) {
  return val == null ? "-" : String(val);
}

export const generatePDF = async (data: any, config: any, mappings: any) => {
  const reportsDir = path.resolve(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

  const mapped: Record<string, any> = {};
  for (const key of Object.keys(mappings)) {
    mapped[key] = resolvePath(data, mappings[key]);
  }

  let sectionsHtml = "";
  for (const s of config.sections) {
    if (s === "Key Body Vitals") {
      sectionsHtml += `<h2>Key Body Vitals</h2>
        <p>Overall Health Score: ${safe(mapped.overallHealthScore)}</p>
        <p>Heart Rate: ${safe(mapped.heartRate)}</p>
        <p>BP: ${safe(mapped.systolic)} / ${safe(mapped.diastolic)}</p>`;
    } else if (s === "Body Composition") {
      sectionsHtml += `<h2>Body Composition</h2>
        <p>BMI: ${safe(mapped.bmi)}</p>`;
    } else if (s.includes("Endurance") || s.includes("Fitness")) {
      sectionsHtml += `<h2>${s}</h2>
        <p>Endurance (time): ${safe(mapped.endurance)}</p>`;
    } else if (s === "Heart Health") {
      sectionsHtml += `<h2>Heart Health</h2>
    <p>Heart Rate: ${safe(mapped.heartRate)}</p>
    <p>BP: ${safe(mapped.systolic)} / ${safe(mapped.diastolic)}</p>`;
    } else if (s === "Stress Level") {
      sectionsHtml += `<h2>Stress Level</h2>
    <p>Stress Index: ${safe(mapped.stressIndex)}</p>`;
    } else if (s === "Posture") {
      sectionsHtml += `<h2>Posture</h2>
    <p>Status: ${safe(mapped.posture)}</p>`;
    } else {
      sectionsHtml += `<h2>${s}</h2><p>--</p>`;
    }
  }

  const html = `
    <html>
      <head><meta charset="utf-8"/><title>Report</title></head>
      <body>
        <h1>Assessment Report</h1>
        <p><strong>Session:</strong> ${data.session_id} <br/>
        <strong>Assessment ID:</strong> ${data.assessment_id}</p>
        ${sectionsHtml}
      </body>
    </html>
  `;

  const filePath = path.join(reportsDir, `report_${data.session_id}.pdf`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return filePath;
};
