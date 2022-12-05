import { Application } from "https://deno.land/x/oak@v11.1.0/application.ts";
import { env } from "../../lib/imports.ts";
import { AppModule } from "./app.module.ts";

const port = +(env?.PORT || 8000);

const app = new Application();

const _mainRouter = new AppModule(app);

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });