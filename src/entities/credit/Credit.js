export class Credit {
  constructor({ platform, user_id, id, consumed }) {
    this.platform = platform;
    this.id = id;
    this.user_id = user_id;
    this.consumed = consumed;
  }
}
