import { config } from "https://deno.land/std@0.163.0/dotenv/mod.ts";
export * from "https://deno.land/x/oak@v11.1.0/mod.ts";
export { env };

const env = await config();
