import "dotenv/config";

export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    bypassAuth: process.env.BYPASS_AUTH === "true",

    port: Number(process.env.PORT ?? 3000),

    database: {
        host: process.env.DB_HOST ?? "localhost",
        port: Number(process.env.DB_PORT ?? 5432),
        name: process.env.DB_NAME ?? "",
        user: process.env.DB_USER ?? "",
        password: process.env.DB_PASSWORD ?? "",
        schema: process.env.DB_SCHEMA ?? "public",
    },
};