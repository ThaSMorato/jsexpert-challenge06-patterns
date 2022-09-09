import { jest, expect, describe, it, beforeEach } from "@jest/globals";
import { PLATFORMS } from "../../src/constants/Platforms";
import CreditsRepository from "../../src/db/CreditsRepository";
import { Credit } from "../../src/entities/credit/Credit";
import { CreditMotherObject } from "./model/CreditMotherObject";

describe("#Credits Repository", () => {
  let repo = {};

  const db = {
    findOne: jest.fn(),
    insertOne: jest.fn(),
    updateOne: jest.fn(),
    find: jest.fn(),
  };

  const credit = CreditMotherObject.valid();

  beforeEach(() => jest.clearAllMocks());

  beforeEach(async () => (repo = new CreditsRepository({ db })));

  it("should call insertOne on create", async () => {
    await repo.create(credit);
    const { platform, user_id } = credit;

    expect(db.insertOne).toBeCalledWith({ platform, user_id });
  });

  it("should call find on findCreditsByUser", async () => {
    db.find.mockResolvedValue([{ ...credit }]);

    const response = await repo.findCreditsByUser(credit.user_id);

    expect(db.find).toBeCalledWith({ user_id: credit.user_id });

    expect(response).toStrictEqual([new Credit({ ...credit })]);
  });

  it("should call findOne on userHasCredit", async () => {
    db.findOne.mockResolvedValue({ ...credit });

    const response = await repo.userHasCredit(credit.user_id, credit.platform);

    expect(db.findOne).toBeCalledWith({ user_id: credit.user_id, platform: credit.platform });

    expect(response).toStrictEqual(new Credit({ ...credit }));
  });

  it("should return null if not found", async () => {
    db.findOne.mockResolvedValue(null);
    db.find.mockResolvedValue(null);

    const responseUserHasCredit = await repo.userHasCredit(credit.user_id, credit.platform);

    const responseFindCreditsByUser = await repo.findCreditsByUser(credit.user_id);

    expect(responseUserHasCredit).toBeNull();
    expect(responseFindCreditsByUser).toBeNull();
  });

  it("should call updateOne on consume", async () => {
    db.findOne.mockResolvedValue({ ...credit });

    await repo.consume(credit.user_id, credit.platform);

    expect(db.updateOne).toBeCalledWith(
      {
        _id: credit.id,
      },
      {
        $set: {
          consumed: true,
        },
      }
    );
  });
});
