import express from "express";
import { getPublicStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/public", getPublicStats);

export default router;
