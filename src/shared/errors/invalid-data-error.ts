export class InvalidDataError extends Error {
  constructor(private error: any) {
    super(error);
  }
}
