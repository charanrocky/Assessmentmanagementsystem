import { Router } from "express";
import { generateReport } from "../controllers/reportController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/generate", authMiddleware, generateReport);

export default router;
