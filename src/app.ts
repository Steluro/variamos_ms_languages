import cors from "cors";
import express from "express";
import languageRouter from "./modules/languages/language.route";

const app = express();

app.disable("x-powered-by");

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());

app.use("", languageRouter);

app.use(
    (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error("ERROR:", err);
        console.error("MESSAGE:", err.message);
        console.error("STACK:", err.stack);

        res.status(500).json({
            message: err.message,
        });
    }
);

export default app;