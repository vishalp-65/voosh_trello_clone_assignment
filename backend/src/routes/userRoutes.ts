import express from "express";
import {
    registerUser,
    loginUser,
    updateUserProfile,
    googleLogin,
    getUserByToken,
} from "../controller/authController";
import { protect } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.put("/profile", protect, upload.single("image"), updateUserProfile);
router.post("/google-login", googleLogin);

router.get("/getUserByToken", protect, getUserByToken);

export default router;
