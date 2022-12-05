import { Controller, Get } from "../../../../lib/decorators/controller-module.decorator.ts";
import { Context } from "../../../../lib/imports.ts";

@Controller('hello')
export class ExampleModuleController {
  
  @Get('world') // You can use the following methods (Get, Post, Put, Patch, Delete)
  teste(ctx: Context) {
    ctx.response.body = "Hello World";
  }
}
