import { User } from "../entities/user/User";

class UsersRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async create({ phone, email }) {
    await this.#db.insertOne({ phone, email });
  }

  async find(user_id) {
    const user = await this.#db.findOne({
      _id: user_id,
    });

    if (user) {
      return new User(user);
    }

    return null;
  }
}

export default UsersRepository;
