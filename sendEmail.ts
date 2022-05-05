import { Callable } from './callable';

// Example with `default export`
export default class SendEmail implements Callable {
  namespace = 'sendEmail';

  email: string;

  constructor(email: string) {
    this.email = email;
  }

  public invoke() {
    console.log(`Sending email to ${this.email}`);
  }
}
