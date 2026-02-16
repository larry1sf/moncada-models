import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "@/lib/const";
import { createClient } from "@libsql/client";

export const tursoClient = createClient({
    url: TURSO_DATABASE_URL ?? "undefine",
    authToken: TURSO_AUTH_TOKEN ?? "undefine",
});