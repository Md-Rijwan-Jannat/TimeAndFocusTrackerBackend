import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import notFoundErrorHandler from "./app/error/notFoundError";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

// Enable CORS with specific options
app.use(
  cors({
    origin: ["http://localhost:3000"], // Frontend URL
    credentials: true, // Enable cookies
  })
);

// Parsers for POST data
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/v1", router);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "The Focus Tracker server is running",
  });
});

// Not Found Handler (for unmatched routes)
app.use(notFoundErrorHandler);

// Global Error Handler (for all errors)
app.use(globalErrorHandler);

export default app;
