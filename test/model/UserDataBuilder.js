import { User } from "../../src/entities/user/User";

export class UsersDataBuilder {
  constructor() {
    this.usserData = {
      phone: "32165422",
      id: "an_user_id",
      email: "an_user@email.com",
    };
  }

  static anUser() {
    return new UsersDataBuilder();
  }

  build() {
    const user = new User(this.usserData);

    return user;
  }
}
