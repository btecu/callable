import { Callable, CallableSerializable, processMessage } from './callable';
import SendEmail from './sendEmail'
import { SendSms } from './src/communication/sendSms';

const FauxQueue: string[] = [];

async function consumeQueue() {
  while (FauxQueue.length > 0) {
    let message = FauxQueue.shift()!;
    await processMessage(message);
  }
}

function queueMessage(message: Callable) {
  let model: CallableSerializable = {
    ...message,
    type: message.constructor.name
  };

  let jsonMessage = JSON.stringify(model);

  FauxQueue.push(jsonMessage);
}

async function main() {
  queueMessage(new SendEmail('john@doe.com'));
  queueMessage(new SendSms('Hi', '(555) 123-4567'));

  await consumeQueue();
}

main();
