import { PLATFORMS } from "../../src/constants/Platforms";
import { Credit } from "../../src/entities/credit/Credit";

export class CreditsDataBuilder {
  constructor() {
    this.creditData = {
      platform: PLATFORMS.EMAIL,
      user_id: "an_user_id",
      id: "1561651651651651",
    };
  }

  static aCredit() {
    return new CreditsDataBuilder();
  }

  build() {
    const credit = new Credit(this.creditData);

    return credit;
  }
}
