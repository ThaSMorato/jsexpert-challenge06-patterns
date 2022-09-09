import CreditsRepository from "../db/CreditsRepository";

export class SenderFactory {
  static async createSenderInstance(platform) {
    const service = {
      send: console.log,
    };
    const credits_repository = new CreditsRepository({ db: {} });
    const { default: Sender } = await import(`../modules/message/sender/${platform}/Sender`);
    return new Sender({ service, credits_repository });
  }
}
