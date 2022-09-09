import { PLATFORMS } from "../../../../constants/Platforms";
import { SenderInterface } from "../../../../interface/SenderInterface";

class SmsSender extends SenderInterface {
  constructor({ service, credits_repository }) {
    super({ service, credits_repository });
    this.platform = "";
  }

  builder(user_id) {
    this.platform = PLATFORMS.SMS;
    this.user_id = user_id;
    return this;
  }

  from(user_phone) {
    this.user_phone = user_phone;
    return this;
  }

  to(addressee_phone) {
    this.addressee_phone = addressee_phone;
    return this;
  }

  subject(sms_subject) {
    this.sms_subject = sms_subject;
    return this;
  }

  message(body) {
    this.body = body;
    return this;
  }

  async send() {
    const { addressee_phone, body, sms_subject, user_phone, platform, user_id } = this;
    await this.service.send({
      from: user_phone,
      to: addressee_phone,
      subject: sms_subject,
      message: body,
      platform,
    });

    this.credits_repository.consume(user_id, platform);
  }
}

export default SmsSender;
