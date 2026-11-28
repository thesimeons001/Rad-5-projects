import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests. Please try again later."
});

app.use(limiter);

// General middleware
app.use(express.json());

// Routes
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

// Error handler
app.use(errorHandler);

export default app;