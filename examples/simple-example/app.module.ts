import { Module } from "../../lib/decorators/module.decorator.ts";
import { ModuleClass } from "../../lib/module.ts";
import { ExampleModuleController } from "./modules/example-module/example-module.controller.ts";
import { ExampleModuleModule } from "./modules/example-module/example-module.module.ts";

@Module({
  imports: [ExampleModuleModule], // You can import a module import and
  controllers: [ExampleModuleController] // controller import, it depends of your level of modularization
}) // In this test, you will notice that the controller ExampleModuleController will be initialized 2 times, this happens because you need to import the module OR the controller, its not very good
export class AppModule extends ModuleClass {}