export class ProductError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
    this.name = this.constructor.name
  }
}
