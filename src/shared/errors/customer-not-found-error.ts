export class CustomerNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Customer not found!';
  }
}
