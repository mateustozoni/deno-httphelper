import { Application, Router } from "../imports.ts";

interface Module {
  imports?: any[];
  routers?: Router[];
  controllers?: any[];
}

export function Module({ imports, routers, controllers }: Module) {
  return function _DecoratorName<T extends {new(...args: any[]): {}}>(constr: T){
    return class extends constr {
      _router: Router;

      constructor(...args: any[]) {
        super(...args);

        console.info(`[HTTPHelper] [Module] ${constr.name} initialized`);
        
        const appOrRouter: Application = args[0];

        this._router = new Router();

        (routers || []).forEach(subrouter => {
          this._router.use(subrouter.routes(), subrouter.allowedMethods())
        });

        (imports || []).forEach(subrouter => {
          const instance = new subrouter(this._router);
          const routes = instance.router.routes();
          const methods = instance.router.allowedMethods();
          this._router.use(routes, methods);
        });

        (controllers || []).forEach(subcontroller => {
          const instance = new subcontroller();
          const routes = instance.router.routes();
          const methods = instance.router.allowedMethods();
          this._router.use(routes, methods);
        });
        
        appOrRouter.use(this._router.allowedMethods());
        appOrRouter.use(this._router.routes());
      }
    }
  }
}