import { UsersDataBuilder } from "./UserDataBuilder";

export class UserMotherObject {
  static valid() {
    return UsersDataBuilder.anUser().build();
  }
}
