import app from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";

const PORT = env.port;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    console.log("Connecting to database...");
    sequelize.authenticate()
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
        });
});

const shutdown = async () => {
    console.log("Server stopped");

    server.close(() => {
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);