import { Application, Router } from "./imports.ts";

export abstract class ModuleClass {
  _router!: Router;
  
  constructor(_app: Application) {}

  get router() {
    return this._router;
  }
}