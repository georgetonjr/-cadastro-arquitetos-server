export class ArchitectNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Architect not found!';
  }
}
