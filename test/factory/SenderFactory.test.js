import { expect, describe, it } from "@jest/globals";
import { PLATFORMS } from "../../src/constants/Platforms";
import { SenderFactory } from "../../src/factory/SenderFactory";
import EmailSender from "../../src/modules/message/sender/email/Sender";
import SmsSender from "../../src/modules/message/sender/sms/Sender";
import WhatsappSender from "../../src/modules/message/sender/whatsapp/Sender";

describe("#Factory", () => {
  it("Should return a email sender instance if platform is email", async () => {
    const emailSender = await SenderFactory.createSenderInstance(PLATFORMS.EMAIL);

    expect(emailSender).toBeInstanceOf(EmailSender);
  });

  it("Should return a sms sender instance if platform is sms", async () => {
    const smsSender = await SenderFactory.createSenderInstance(PLATFORMS.SMS);

    expect(smsSender).toBeInstanceOf(SmsSender);
  });

  it("Should return a whatsapp sender instance if platform is whatsapp", async () => {
    const whatsappSender = await SenderFactory.createSenderInstance(PLATFORMS.WHATSAPP);

    expect(whatsappSender).toBeInstanceOf(WhatsappSender);
  });
});
