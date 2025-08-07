import express from "express";
import cors from "cors";
import cookieParser from"cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRouter from "./routes/course.route.js";

const app = express();

app.use(express.json());

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
  credentials: true
}));

app.use(cookieParser());

// Test Route
app.use('/ping', (req, res) => {
  res.send("pong");
});

app.use('/api/v1/user',userRoutes)

app.use('/api/v1/courses',courseRouter)

// 404 Handler
// app.all("*", (req, res) => {
//   res.status(404).send("OOPs!! 404 page not found!");
// });

app.use(errorMiddleware)

export default app;
