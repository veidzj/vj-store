import { EntityValidationError } from '@/domain/errors'

export class CategoryValidation {
  public static validateName(name: string): void {
    if (name.length < 5) {
      throw new EntityValidationError('Name must be at least 3 characters long')
    }
  }
}
