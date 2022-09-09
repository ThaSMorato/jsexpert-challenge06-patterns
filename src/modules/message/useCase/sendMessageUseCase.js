export class SendMessageUseCase {
  constructor({ sender }) {
    this.sender = sender;
  }

  async perform({ from, to, subject, message, user_id }) {
    return this.sender.builder(user_id).from(from).to(to).subject(subject).message(message).send();
  }
}
