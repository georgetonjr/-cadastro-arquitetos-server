export class InvalidDataError extends Error {
  constructor(error: any) {
    super();
    this.message = error.message || 'Invalid params on request';
  }
}
