import { jest, expect, describe, it, beforeEach } from "@jest/globals";
import { Credit } from "../../../src/entities/credit/Credit";
import { CreditMotherObject } from "../../model/CreditMotherObject";

describe("#Entity Credit", () => {
  it("should have all fields", () => {
    const credit = CreditMotherObject.valid();

    expect({ ...new Credit(credit) }).toStrictEqual({ ...credit });
  });
});
