import SendEmail from './sendEmail'
import { SendSms } from './src/communication/sendSms';
import { consumeQueue, queueMessage } from './queue';

async function main() {
  queueMessage(new SendEmail('john@doe.com'));
  queueMessage(new SendSms('Hi', '(555) 123-4567'));
  queueMessage(new SendSms('Hi', '(555) 000-9000'));
  queueMessage(new SendEmail('jane@doe.com'));

  await consumeQueue();
}

main();
