import { Module } from "https://deno.land/x/httphelper@0.1.0/lib/decorators/module.decorator.ts";
import { ModuleClass } from "https://deno.land/x/httphelper@0.1.0/lib/module.ts";
import { ExampleModuleController } from "./example-module.controller.ts";

@Module({
  controllers: [ExampleModuleController]
})
export class ExampleModuleModule extends ModuleClass {}
// The ExampleModuleModule is not a typo, its just a example (I often use `${nameOfModule}Module` for the class name)