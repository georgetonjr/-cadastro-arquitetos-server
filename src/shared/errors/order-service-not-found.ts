export class OrderServiceNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Order service not found!';
  }
}
