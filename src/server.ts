import app from "./app";
import { env } from "./config/env";

const PORT = env.port;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const shutdown = async () => {
    console.log("Server stopped");

    server.close(() => {
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);