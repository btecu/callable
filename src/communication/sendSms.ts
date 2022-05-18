import { Callable } from '../../callable';

// Example named `export` and different namespace
export class SendSms implements Callable {
  message: string;
  number: string;

  constructor(message: string, number: string) {
    this.message = message;
    this.number = number;
  }

  public async invoke() {
    console.log('\x1b[36m', `Sending SMS to ${this.number}`, '\x1b[0m');

    // Fake Twillio call
    await new Promise((res) => setTimeout(res, 50));
  }
}
