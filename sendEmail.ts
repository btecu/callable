import { Callable } from './callable';

// Example with `default export`
export default class SendEmail implements Callable {
  namespace = 'sendEmail';

  email: string;

  constructor(email: string) {
    this.email = email;
  }

  public async invoke() {
    console.log(`Sending email to ${this.email}`);

    // Fake Twillio call
    await new Promise((res) => setTimeout(res, 50));
  }
}
