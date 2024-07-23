import express from "express";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../controller/taskController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);

router.post("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
