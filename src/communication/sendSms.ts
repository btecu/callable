import { Callable } from '../../callable';

// Example named `export` and different namespace
export class SendSms implements Callable {
  namespace = 'src/communication/sendSms';

  message: string;
  number: string;

  constructor(message: string, number: string) {
    this.message = message;
    this.number = number;
  }

  public async invoke() {
    console.log(`Sending SMS to ${this.number}`);

    // Fake Twillio call
    await new Promise((res) => setTimeout(res, 50));
  }
}
