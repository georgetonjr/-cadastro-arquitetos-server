export class UserAlreadyExistsError extends Error {
  constructor() {
    super();
    this.message = 'user already registered';
  }
}
