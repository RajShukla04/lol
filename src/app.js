import express, { urlencoded } from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
// routes
import userRouter from "./routes/user.route.js";
import contentRouter from "./routes/content.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/content", contentRouter);

export { app };
