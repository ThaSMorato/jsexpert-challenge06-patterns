import { PLATFORMS } from "../../constants/Platforms";

export class User {
  constructor({ phone, email, id }) {
    this.phone = phone;
    this.id = id;
    this.email = email;
  }

  contact(platform) {
    if (platform === PLATFORMS.EMAIL) {
      return this.email;
    }

    return this.phone;
  }
}
