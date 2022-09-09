import { PLATFORMS } from "../../../../constants/Platforms";
import { SenderInterface } from "../../../../interface/SenderInterface";

class WhatsappSender extends SenderInterface {
  constructor({ credits_repository }) {
    const service = {
      send: console.log,
    };

    super({ service, credits_repository });
    this.platform = "";
  }

  builder(user_id) {
    this.platform = PLATFORMS.WHATSAPP;
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

  subject(whatsapp_subject) {
    this.whatsapp_subject = whatsapp_subject;
    return this;
  }

  message(body) {
    this.body = body;
    return this;
  }

  async send() {
    const { addressee_phone, body, whatsapp_subject, user_phone, platform, user_id } = this;
    await this.service.send({
      from: user_phone,
      to: addressee_phone,
      subject: whatsapp_subject,
      message: body,
      platform,
    });

    this.credits_repository.consume(user_id, platform);
  }
}

export default WhatsappSender;
