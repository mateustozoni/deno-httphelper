import { Module } from "../../../../lib/decorators/module.decorator.ts";
import { ModuleClass } from "../../../../lib/module.ts";
import { ExampleModuleController } from "./example-module.controller.ts";

@Module({
  controllers: [ExampleModuleController]
})
export class ExampleModuleModule extends ModuleClass {}
// The ExampleModuleModule is not a typo, its just a example (I often use `${nameOfModule}Module` for the class name)