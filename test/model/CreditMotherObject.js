import { CreditsDataBuilder } from "./CreditDataBuilder";

export class CreditMotherObject {
  static valid() {
    return CreditsDataBuilder.aCredit().build();
  }
}
