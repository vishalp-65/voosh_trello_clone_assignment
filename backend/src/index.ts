import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
