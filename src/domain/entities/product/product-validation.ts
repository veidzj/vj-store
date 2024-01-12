import { EntityValidationError } from '@/domain/errors'

export class ProductValidation {
  public static validateName(name: string): void {
    if (name.length < 3) {
      throw new EntityValidationError('Name must be at least 3 characters long')
    }
    if (name.length > 20) {
      throw new EntityValidationError('Name must be less than or equal to 20 characters long')
    }
    if (!/^[A-Za-z]+(?: [A-Za-z0-9]+)*$/.test(name)) {
      throw new EntityValidationError('Name must contain only letters, numbers and spaces')
    }
  }

  public static validateDescription(description: string): void {
    if (description.length < 50) {
      throw new EntityValidationError('Description must be at least 50 characters long')
    }
    if (description.length > 300) {
      throw new EntityValidationError('Description must be less than or equal to 300 characters long')
    }
  }
}
