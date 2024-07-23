import express from "express";
import {
    registerUser,
    loginUser,
    updateUserProfile,
    googleLogin,
} from "../controller/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
// router.route('/profile').put(protect, uploadToS3.single('image'), updateUserProfile);

export default router;
