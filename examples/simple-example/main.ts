import { Application, env } from "https://deno.land/x/httphelper@0.1.0/lib/imports.ts";
import { AppModule } from "./app.module.ts";

const port = +(env?.PORT || 8000);

const app = new Application();

const _mainRouter = new AppModule(app);

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });