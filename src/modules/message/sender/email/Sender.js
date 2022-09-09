import { PLATFORMS } from "../../../../constants/Platforms";
import { SenderInterface } from "../../../../interface/SenderInterface";

class EmailSender extends SenderInterface {
  constructor({ service, credits_repository }) {
    super({ service, credits_repository });
    this.platform = "";
  }

  builder(user_id) {
    this.platform = PLATFORMS.EMAIL;
    this.user_id = user_id;
    return this;
  }

  from(user_email) {
    this.user_email = user_email;
    return this;
  }

  to(addressee_email) {
    this.addressee_email = addressee_email;
    return this;
  }

  subject(email_subject) {
    this.email_subject = email_subject;
    return this;
  }

  message(body) {
    this.body = body;
    return this;
  }

  async send() {
    const { addressee_email, body, email_subject, user_email, platform, user_id } = this;
    await this.service.send({
      from: user_email,
      to: addressee_email,
      subject: email_subject,
      message: body,
      platform,
    });

    this.credits_repository.consume(user_id, platform);
  }
}

export default EmailSender;
