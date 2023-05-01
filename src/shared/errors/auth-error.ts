export class AuthError extends Error {
  constructor() {
    super();
    this.message = 'Email or password are wrong!';
  }
}
