import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

// Error handler
app.use(errorHandler);

export default app;