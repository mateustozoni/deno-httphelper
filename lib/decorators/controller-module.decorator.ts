import { Router } from "../imports.ts";

const SubMethods = Symbol('SubMethods');

interface ControllerInterface {
  path: string
}

type ControllerOptions = string; //| ControllerInterface;

enum MethodType {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
  PATCH = "patch",
}

function _convertClassNameIntoPrefix(name: string) {
  return name.toLowerCase().split('controller')[0];
}

function _addToRouter(router: Router, options: {path: string, method: MethodType}, classMethod: any) {
  switch (options.method) {
    case MethodType.GET:
      router.get(options.path, classMethod)
      return router;
    case MethodType.POST:
      router.post(options.path, classMethod)
      return router;
    case MethodType.PUT:
      router.put(options.path, classMethod)
      return router;
    case MethodType.PATCH:
      router.patch(options.path, classMethod)
      return router;
    case MethodType.DELETE:
      router.delete(options.path, classMethod)
      return router;
    default:
      console.log(options.method);
      throw new Error("Method not mapped");
  }
}

export function Controller(controllerOptions?: ControllerOptions) {
  return function _DecoratorName<T extends {new(...args: any[]): {}}>(constr: T){
    return class extends constr {
      _router: Router;
      constructor(...args: any[]) {
        super(...args)
        
        this._router = new Router({
          prefix: "/" + (controllerOptions || _convertClassNameIntoPrefix(constr.name))
        });

        const subMethods = constr.prototype[SubMethods];
        if (subMethods) {
          subMethods.forEach((options: {path: string, method: MethodType, key: string}) => {
            this._router = _addToRouter(this._router, options, (this as any)[options.key])
          });
        }

        console.info(`[HTTPHelper] [Controller] ${constr.name} initialized`);
      }

      get router() {
        return this._router;
      }
    }
  }
}

// Target = Classe
// Descriptor = Funcao/metodo
// PropertyKey = Nome Funcao/metodo

function attachMethodToPath(method: MethodType, path?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[SubMethods] = target[SubMethods] || new Map();
  
    target[SubMethods].set(`${method}-${propertyKey}+${path}`, {path: "/" + path, method, key: propertyKey});
  }
};

export function Get(path?: string) {
  return attachMethodToPath(MethodType.GET, path);
}

export function Post(path?: string) {
  return attachMethodToPath(MethodType.POST, path);
}

export function Put(path?: string) {
  return attachMethodToPath(MethodType.PUT, path);
}

export function Patch(path?: string) {
  return attachMethodToPath(MethodType.PATCH, path);
}

export function Delete(path?: string) {
  return attachMethodToPath(MethodType.DELETE, path);
}