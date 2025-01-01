import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());

// app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "The Focus Tracker server is running",
  });
});

export default app;
