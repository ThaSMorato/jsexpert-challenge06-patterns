import { jest, expect, describe, it } from "@jest/globals";
import { PLATFORMS } from "../../../src/constants/Platforms";
import EmailSender from "../../../src/modules/message/sender/email/Sender";
import SmsSender from "../../../src/modules/message/sender/sms/Sender";
import WhatsappSender from "../../../src/modules/message/sender/whatsapp/Sender";
import { UserMotherObject } from "../../model/UserMotherObject";

describe("#Senders", () => {
  const service = {
    send: jest.fn(),
  };

  const credits_repository = {
    consume: jest.fn(),
  };

  const addressee = {
    email: "an_addressee@email.com",
    phone: "99999999",
  };

  const message = {
    subject: "subject",
    body: "hello world!",
  };

  let emailSender = {};
  let smsSender = {};
  let whatsappSender = {};

  const user = UserMotherObject.valid();

  beforeEach(() => jest.clearAllMocks());

  beforeEach(() => {
    emailSender = new EmailSender({ service, credits_repository });
    smsSender = new SmsSender({ service, credits_repository });
    whatsappSender = new WhatsappSender({ service, credits_repository });
  });

  it("should receive the user id and set the platform property", () => {
    const emailBuilder = emailSender.builder(user.id);
    const smsBuilder = smsSender.builder(user.id);
    const whatsappBuilder = whatsappSender.builder(user.id);

    expect(emailBuilder.user_id).toBe(user.id);
    expect(emailBuilder.platform).toBe(PLATFORMS.EMAIL);
    expect(smsBuilder.user_id).toBe(user.id);
    expect(smsBuilder.platform).toBe(PLATFORMS.SMS);
    expect(whatsappBuilder.user_id).toBe(user.id);
    expect(whatsappBuilder.platform).toBe(PLATFORMS.WHATSAPP);
  });

  it("should receive the user contact ", () => {
    const emailFrom = emailSender.from(user.email);
    const smsFrom = smsSender.from(user.phone);
    const whatsappFrom = whatsappSender.from(user.phone);

    expect(emailFrom.user_email).toBe(user.email);
    expect(smsFrom.user_phone).toBe(user.phone);
    expect(whatsappFrom.user_phone).toBe(user.phone);
  });

  it("should receive the addressee contact ", () => {
    const emailTo = emailSender.to(addressee.email);
    const smsTo = smsSender.to(addressee.phone);
    const whatsappTo = whatsappSender.to(addressee.phone);

    expect(emailTo.addressee_email).toBe(addressee.email);
    expect(smsTo.addressee_phone).toBe(addressee.phone);
    expect(whatsappTo.addressee_phone).toBe(addressee.phone);
  });

  it("should receive the subject", () => {
    const emailSubject = emailSender.subject(message.subject);
    const smsSubject = smsSender.subject(message.subject);
    const whatsappSubject = whatsappSender.subject(message.subject);

    expect(emailSubject.email_subject).toBe(message.subject);
    expect(smsSubject.sms_subject).toBe(message.subject);
    expect(whatsappSubject.whatsapp_subject).toBe(message.subject);
  });

  it("should receive the message", () => {
    const emailMessage = emailSender.message(message.body);
    const smsMessage = smsSender.message(message.body);
    const whatsappMessage = whatsappSender.message(message.body);

    expect(emailMessage.body).toBe(message.body);
    expect(smsMessage.body).toBe(message.body);
    expect(whatsappMessage.body).toBe(message.body);
  });

  it("should send the email", async () => {
    await emailSender
      .builder(user.id)
      .from(user.email)
      .to(addressee.email)
      .subject(message.subject)
      .message(message.body)
      .send();

    expect(service.send).toBeCalledWith({
      from: user.email,
      to: addressee.email,
      subject: message.subject,
      message: message.body,
      platform: PLATFORMS.EMAIL,
    });

    expect(credits_repository.consume).toBeCalledWith(user.id, PLATFORMS.EMAIL);
  });

  it("should send the sms", async () => {
    await smsSender
      .builder(user.id)
      .from(user.phone)
      .to(addressee.phone)
      .subject(message.subject)
      .message(message.body)
      .send();

    expect(service.send).toBeCalledWith({
      from: user.phone,
      to: addressee.phone,
      subject: message.subject,
      message: message.body,
      platform: PLATFORMS.SMS,
    });

    expect(credits_repository.consume).toBeCalledWith(user.id, PLATFORMS.SMS);
  });

  it("should send the whatsapp", async () => {
    await whatsappSender
      .builder(user.id)
      .from(user.phone)
      .to(addressee.phone)
      .subject(message.subject)
      .message(message.body)
      .send();

    expect(service.send).toBeCalledWith({
      from: user.phone,
      to: addressee.phone,
      subject: message.subject,
      message: message.body,
      platform: PLATFORMS.WHATSAPP,
    });

    expect(credits_repository.consume).toBeCalledWith(user.id, PLATFORMS.WHATSAPP);
  });
});
