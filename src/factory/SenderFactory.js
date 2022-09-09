import CreditsRepository from "../db/CreditsRepository";

export class SenderFactory {
  static async createSenderInstance(platform) {
    const credits_repository = new CreditsRepository({ db: {} });
    const { default: Sender } = await import(`../modules/message/sender/${platform}/Sender`);
    return new Sender({ credits_repository });
  }
}
