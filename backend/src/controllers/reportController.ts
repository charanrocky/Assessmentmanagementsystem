import { Request, Response } from "express";
import { assessmentData } from "../data/data";
import { assessmentConfig } from "../config/assessmentConfig";
import { fieldMappings } from "../config/fieldMappings";
import { generatePDF } from "../services/pdfService";

export const generateReport = async (req: Request, res: Response) => {
  const { session_id } = req.body;
  const session = assessmentData.find((s) => s.session_id === session_id);
  if (!session) return res.status(404).json({ message: "Session not found" });

  const config =
    assessmentConfig[session.assessment_id as keyof typeof assessmentConfig];

  if (!config)
    return res.status(400).json({ message: "Unsupported assessment" });

  const pdfPath = await generatePDF(session, config, fieldMappings);
  res.json({ message: "Report generated", path: pdfPath });
};
