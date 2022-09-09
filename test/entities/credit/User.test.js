import { expect, describe, it } from "@jest/globals";
import { PLATFORMS } from "../../../src/constants/Platforms";
import { User } from "../../../src/entities/user/User";
import { UserMotherObject } from "../../model/UserMotherObject";

describe("#Entity User", () => {
  const user = UserMotherObject.valid();

  it("should have all fields", () => {
    expect({ ...new User(user) }).toStrictEqual({ ...user });
  });

  it("should return the contact depending on the platform", () => {
    expect(user.contact(PLATFORMS.EMAIL)).toBe(user.email);
    expect(user.contact(PLATFORMS.SMS)).toBe(user.phone);
    expect(user.contact(PLATFORMS.WHATSAPP)).toBe(user.phone);
  });
});
