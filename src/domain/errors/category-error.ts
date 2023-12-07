export class CategoryError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
    this.name = this.constructor.name
  }
}
