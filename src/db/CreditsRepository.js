import { Credit } from "../entities/credit/Credit";

export class CreditsRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async create({ platform, user_id }) {
    await this.#db.insertOne({ platform, user_id });
  }

  async findCreditsByUser(user_id) {
    // const user_credits = this.credits.filter((credit) => credit.user_id === user_id);
    const userCredits = await this.#db.find({
      user_id,
    });

    if (userCredits) {
      return userCredits.map((credit) => new Credit(credit));
    }

    return null;
  }

  async userHasCredit(user_id, platform) {
    const userCredit = await this.#db.findOne({
      user_id,
      platform,
    });

    if (userCredit) {
      return new Credit(userCredit);
    }

    return null;
  }

  async consume(user_id, platform) {
    const user_credit = await this.userHasCredit(user_id, platform);

    if (user_credit === null) {
      return `User doesnt have a credit for ${platform}`;
    }

    await this.#db.updateOne(
      {
        _id: user_credit.id,
      },
      {
        $set: {
          consumed: true,
        },
      }
    );
  }
}

export default CreditsRepository;
