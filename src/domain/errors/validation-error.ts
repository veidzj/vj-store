export class ValidationError extends Error {
  constructor(errorMessage: string) {
    super(ValidationError.formatErrorMessage(errorMessage))
    this.name = this.constructor.name
  }

  private static formatErrorMessage(string: string): string {
    const words = string.replace(/([A-Z])/g, ' $1').trim().toLowerCase().split(' ')
    words[0] = ValidationError.capitalizeFirstLetter(words[0])
    return words.join(' ')
  }

  private static capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
