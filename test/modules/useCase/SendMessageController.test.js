import { jest, expect, describe, it } from "@jest/globals";
import { ERROS_RESPONSES } from "../../../src/constants/ErrorsResponses";
import { PLATFORMS } from "../../../src/constants/Platforms";
import { SendMessageController } from "../../../src/modules/message/useCase/sendMessageController";
import { CreditMotherObject } from "../../model/CreditMotherObject";
import { UserMotherObject } from "../../model/UserMotherObject";

describe("#Send Messsage Controller", () => {
  const use_case = {
    perform: jest.fn(),
  };

  const credits_repository = {
    userHasCredit: jest.fn(),
  };

  const users_repository = {
    find: jest.fn(),
  };

  const request = {
    to: "a_to@email.com",
    subject: "subject",
    message: "hello world!",
    user_id: "1213654",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should return user not found if user repo returns null", async () => {
    const controller = new SendMessageController({
      use_case,
      users_repository,
      credits_repository,
      platform: "any",
    });

    users_repository.find.mockResolvedValue(UserMotherObject.notFound());

    const response = await controller.handle(request);

    expect(response).toBe(ERROS_RESPONSES.USER_NOT_FOUND);
  });

  it("should return user does not have credit if credit repo returns null", async () => {
    const controller = new SendMessageController({
      use_case,
      users_repository,
      credits_repository,
      platform: "any",
    });

    users_repository.find.mockResolvedValue(UserMotherObject.valid());

    credits_repository.userHasCredit.mockResolvedValue(CreditMotherObject.userDoesntHave());

    const response = await controller.handle(request);

    expect(users_repository.find).toBeCalledWith(request.user_id);
    expect(response).toBe(ERROS_RESPONSES.USER_DOESNT_HAVE_CREDIT);
  });

  it("should call use case perform", async () => {
    const controller = new SendMessageController({
      use_case,
      users_repository,
      credits_repository,
      platform: PLATFORMS.EMAIL,
    });

    const user = UserMotherObject.valid();

    const { to, subject, message, user_id } = request;

    users_repository.find.mockResolvedValue(user);

    credits_repository.userHasCredit.mockResolvedValue(CreditMotherObject.valid());

    await controller.handle(request);

    expect(users_repository.find).toBeCalledWith(request.user_id);

    expect(credits_repository.userHasCredit).toBeCalledWith(request.user_id, PLATFORMS.EMAIL);

    expect(use_case.perform).toBeCalledWith({
      from: user.contact(PLATFORMS.EMAIL),
      to,
      subject,
      message,
    });
  });
});
