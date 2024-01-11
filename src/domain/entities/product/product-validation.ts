import { EntityValidationError } from '@/domain/errors'

export class ProductValidation {
  public static validateName(name: string): void {
    if (name.length < 3) {
      throw new EntityValidationError('Name must be at least 3 characters long')
    }
  }
}
