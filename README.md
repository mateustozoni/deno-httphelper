
# HTTPHelper

Create an API using Deno and classes, without the effort of creating multiples Routers to make the code more readable.




## Features

- Create a App Module to easily link all modules or controllers of the app
- Single Modules: create a submodule to better organize your code
- Controllers: using the controller you can easily register methods without needing a router in every controller code
- Powered mostly by @Decorators: Use decorators in your code to make a clean integration and build the API faster.


## How to Use
With our demo you can look how the code can be (I added some comments to better guide you through the code)
[Example-demo](https://github.com/mateustozoni/deno-httphelper/tree/main/examples/simple-example)

### Building an App Module (Normally used with the entrypoint)
```ts
import { Module } from "https://deno.land/x/httphelper@0.1.0/lib/decorators/module.decorator.ts";
import { ModuleClass } from "https://deno.land/x/httphelper@0.1.0/lib/module.ts";
import { ExampleModuleController } from "./modules/example-module/example-module.controller.ts";
import { ExampleModuleModule } from "./modules/example-module/example-module.module.ts";

@Module({
  imports: [ExampleModuleModule], // You can import a module import and
  controllers: [ExampleModuleController] // controller import, it depends of your level of modularization
}) // In this test, you will notice that the controller ExampleModuleController will be initialized 2 times, this happens because you need to import the module OR the controller, its not very good
export class AppModule extends ModuleClass {}
```

### Building an Single Module
```ts
import { Module } from "https://deno.land/x/httphelper@0.1.0/lib/decorators/module.decorator.ts";
import { ModuleClass } from "https://deno.land/x/httphelper@0.1.0/lib/module.ts";
import { ExampleModuleController } from "./example-module.controller.ts";

@Module({
  controllers: [ExampleModuleController]
})
export class ExampleModuleModule extends ModuleClass {}
// The ExampleModuleModule is not a typo, its just a example (I often use `${nameOfModule}Module` for the class name)
```

### Building a Controller
```ts
import { Controller, Get } from "https://deno.land/x/httphelper@0.1.0/lib/decorators/controller-module.decorator.ts";
import { Context } from "https://deno.land/x/httphelper@0.1.0/lib/imports.ts";

@Controller('hello')
export class ExampleModuleController {
  
  @Get('world') // You can use the following methods (Get, Post, Put, Patch, Delete)
  teste(ctx: Context) {
    ctx.response.body = "Hello World";
  }
}
```

### How the F my main file will look like?
```ts
import { Application, env } from "https://deno.land/x/httphelper@0.1.0/lib/imports.ts";
import { AppModule } from "./app.module.ts";

const port = +(env?.PORT || 8000);

const app = new Application();

const _mainRouter = new AppModule(app);

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
```
## FAQ

#### This is working?

Yes, you can try the example!

#### This package will receive any updates?

Currently, this package is a WIP, working for the basics but can have a TON of new features. Basic updates will happen but any help will be accepted.
I currently working alone so I don't have a roadmap well defined.

### How can I help?

Create a PR with the changes, including the readme (if its a new feature or if its a change that affects an example).

And you can contact me anytime on Discord (MateusPTZ#9491)
## Authors

- [@mateustozoni](https://www.github.com/mateustozoni)

