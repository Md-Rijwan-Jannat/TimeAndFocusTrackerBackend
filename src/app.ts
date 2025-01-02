import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/modules/routes";
import notFoundErrorHandler from "./app/error/notFoundError";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "The Focus Tracker server is running",
  });
});

// Use the notFoundErrorHandler after all routes
app.use(notFoundErrorHandler);

// Use the global error handler last
app.use(globalErrorHandler);

export default app;
