import path from 'path';
import { Callable, CallableSerializable, processMessage } from './callable';

const FauxQueue: string[] = [];
const TypeCache: WeakMap<Function, string> = new WeakMap();

export async function consumeQueue() {
  while (FauxQueue.length > 0) {
    let message = FauxQueue.shift()!;
    await processMessage(message);
  }
}

export function queueMessage(message: Callable) {
  let type = message.constructor.name;

  let namespace = TypeCache.get(message.constructor);
  if (namespace === undefined) {
    // @ts-ignore
    let callableModule = require
      .main
      .children
      .map(x => ({
        id: x.id,
        klass: x.exports[type] ?? x.exports.default
      }))
      .filter(x => x.klass !== undefined)
      .find(x => message instanceof x.klass);

    namespace = path.relative(module.path, callableModule!.id);

    TypeCache.set(message.constructor, namespace);
  }

  let model: CallableSerializable = {
    ...message,
    namespace,
    type
  };

  let jsonMessage = JSON.stringify(model);

  FauxQueue.push(jsonMessage);
}
