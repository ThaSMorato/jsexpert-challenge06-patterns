import { NotImplementedError } from "../errors/NotImplemented";

export class SenderInterface {
  constructor({ service, credits_repository }) {
    this.service = service;
    this.credits_repository = credits_repository;
  }

  builder() {
    throw new NotImplementedError(this.builder.name);
  }

  from() {
    throw new NotImplementedError(this.from.name);
  }

  to() {
    throw new NotImplementedError(this.to.name);
  }

  subject() {
    throw new NotImplementedError(this.subject.name);
  }

  message() {
    throw new NotImplementedError(this.message.name);
  }

  send() {
    throw new NotImplementedError(this.send.name);
  }
}
