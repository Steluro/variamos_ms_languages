import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import collaboratorRouter from "./routes/collaborator.route";
import elementTypeRouter from "./routes/elementType.route";
import languageRouter from "./routes/language.route";

const app = express();

app.disable("x-powered-by");
app.set("query parser", "extended");

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("", languageRouter);
app.use("", collaboratorRouter);
app.use("", elementTypeRouter);

app.use((req, res, next) => {
  console.log("Session:", req.cookies);
  next();
});

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("ERROR:", err);
    console.error("MESSAGE:", err.message);
    console.error("STACK:", err.stack);

    res.status(500).json({
      message: err.message,
    });
  },
);

export default app;
