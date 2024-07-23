import express, { Application, urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import serverConfig from "./config/server-config";
import databaseConfig from "./config/database-config";

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);

// Just to check api health
app.get("/api/check", (req, res) => {
    return res.status(200).json({ message: "Ok" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(serverConfig.PORT, async () => {
    console.log(
        `Successfully started the server on PORT : ${serverConfig.PORT}`
    );
    await databaseConfig.connect();
    console.log("MongoDB database connect");
});

export default app;
