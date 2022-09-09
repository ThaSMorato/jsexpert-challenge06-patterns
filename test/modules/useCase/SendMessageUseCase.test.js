import { jest, expect, describe, it, beforeEach } from "@jest/globals";
import { SendMessageUseCase } from "../../../src/modules/message/useCase/sendMessageUseCase";

describe("#Message Use Case", () => {
  const sender = {
    builder: jest.fn(),
    from: jest.fn(),
    to: jest.fn(),
    subject: jest.fn(),
    message: jest.fn(),
    send: jest.fn(),
  };

  beforeEach(() => {
    sender.builder.mockReturnValue(sender);
    sender.from.mockReturnValue(sender);
    sender.to.mockReturnValue(sender);
    sender.subject.mockReturnValue(sender);
    sender.message.mockReturnValue(sender);
  });

  beforeEach(() => jest.clearAllMocks());

  const request = {
    from: "an_user@email.com",
    to: "a_to@email.com",
    subject: "subject",
    message: "hello world",
    user_id: "asdasdsad",
  };

  it("should call sender methods on perform", async () => {
    const use_case = new SendMessageUseCase({ sender });

    await use_case.perform(request);

    const { from, to, subject, message, user_id } = request;

    expect(sender.builder).toBeCalledWith(user_id);
    expect(sender.from).toBeCalledWith(from);
    expect(sender.to).toBeCalledWith(to);
    expect(sender.subject).toBeCalledWith(subject);
    expect(sender.message).toBeCalledWith(message);
    expect(sender.builder).toBeCalled();
  });
});
