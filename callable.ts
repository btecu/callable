export interface Callable {
  invoke: () => Promise<void>;
}

export interface CallableSerializable extends Callable {
  namespace: string;
  type: string;
}

const Cache: Map<string, { new (): Callable }> = new Map();

export async function processMessage(message: string) {
  let callable: CallableSerializable = JSON.parse(message);
  let key = `${callable.namespace}-${callable.type}`;

  let klass = Cache.get(key);
  if (klass === undefined) {
    let module = await import(`./${callable.namespace}`);

    klass = module[callable.type] ?? module.default;
    Cache.set(key, klass!);
  }

  let instance = new klass!();
  await instance.invoke.call(callable);
}
