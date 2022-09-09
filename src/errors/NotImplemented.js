export class NotImplementedError extends Error {
  constructor(context) {
    super("Not Implemented");
    this.name = `${context}_${NotImplementedError.name}`;
    this.errorCode = 50;
  }
}
