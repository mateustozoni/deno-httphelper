import { Controller, Get } from "https://deno.land/x/httphelper@0.1.0/lib/decorators/controller-module.decorator.ts";
import { Context } from "https://deno.land/x/httphelper@0.1.0/lib/imports.ts";

@Controller('hello')
export class ExampleModuleController {
  
  @Get('world') // You can use the following methods (Get, Post, Put, Patch, Delete)
  teste(ctx: Context) {
    ctx.response.body = "Hello World";
  }
}
