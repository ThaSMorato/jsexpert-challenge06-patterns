import { jest, expect, describe, it, beforeEach } from "@jest/globals";
import UsersRepository from "../../src/db/UsersRepository";
import { User } from "../../src/entities/user/User";
import { UserMotherObject } from "../model/UserMotherObject";

describe("#Users Repository", () => {
  let repo = {};

  const db = {
    insertOne: jest.fn(),
    findOne: jest.fn(),
  };

  const user = UserMotherObject.valid();

  beforeEach(() => jest.clearAllMocks());

  beforeEach(async () => (repo = new UsersRepository({ db })));

  it("should call insertOne on create", async () => {
    await repo.create(user);
    const { email, phone } = user;

    expect(db.insertOne).toBeCalledWith({ email, phone });
  });

  it("should call findOne on find", async () => {
    db.findOne.mockResolvedValue({ ...user });

    const response = await repo.find(user.id);

    expect(db.findOne).toBeCalledWith({ _id: user.id });

    expect(response).toStrictEqual(new User({ ...user }));
  });

  it("should return null if not found", async () => {
    db.findOne.mockResolvedValue(null);

    const responseFind = await repo.find(user.id);

    expect(responseFind).toBeNull();
  });
});
