import express from "express";
import {
    register,
    login
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

router.get(
    "/instructor-only",
    protect,
    allowRoles("instructor"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Instructor"
        });
    }
);

export default router;