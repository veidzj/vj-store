import isAlpha from 'validator/lib/isAlpha'

import { EntityValidationError } from '@/domain/errors'

export class CategoryValidation {
  public static validateName(name: string): void {
    if (name.length < 3) {
      throw new EntityValidationError('Name must be at least 3 characters long')
    }
    if (name.length > 20) {
      throw new EntityValidationError('Name must be less than or equal to 20 characters long')
    }
    if (!isAlpha(name)) {
      throw new EntityValidationError('Name must contain only letters')
    }
  }

  public static formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }
}
