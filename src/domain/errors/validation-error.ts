export class ValidationError extends Error {
  constructor(errorMessage: string) {
    super(ValidationError.capitalizeFirstLetter(errorMessage))
    this.name = this.constructor.name
  }

  private static capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
