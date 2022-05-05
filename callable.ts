export interface Callable {
  namespace: string;
  invoke: () => void;
}

export interface CallableSerializable extends Callable {
  type: string;
}

const Cache = new Map();

export async function processMessage(message: string) {
  let callable: CallableSerializable = JSON.parse(message);
  let key = `${callable.namespace}-${callable.type}`;

  let klass = Cache.get(key);
  if (klass === undefined) {
    let module = await import(`./${callable.namespace}`);

    klass = module[callable.type] ?? module.default;
    Cache.set(key, klass);
  }

  let instance = new klass();
  instance.invoke.call(callable);
}
