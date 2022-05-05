export interface Callable {
  namespace: string;
  type: string;
  invoke: () => void;
}

const Cache = new Map();

export async function processMessage(message: string) {
  let callable: Callable = JSON.parse(message);
  let key = `${callable.namespace}-${callable.type}`;

  let klass = Cache.get(key);
  if (klass === undefined) {
    let module = await import(`./${callable.namespace}`);

    klass = module[callable.type];
    Cache.set(key, klass);
  }

  let instance = new klass();
  instance.invoke.call(callable);
}
