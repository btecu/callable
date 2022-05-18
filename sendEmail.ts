import { Callable } from './callable';

// Example with `default export`
export default class SendEmail implements Callable {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  public async invoke() {
    console.log('\x1b[32m', `Sending email to ${this.email}`, '\x1b[0m');

    // Fake Twillio call
    await new Promise((res) => setTimeout(res, 50));
  }
}
