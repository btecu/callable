import { Callable } from '../../callable';

// Example named `export` and different namespace
export class SendSms implements Callable {
  namespace = 'src/communication/sendSms';

  phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }

  public invoke() {
    console.log(`Sending SMS to ${this.phone}`);
  }
}
