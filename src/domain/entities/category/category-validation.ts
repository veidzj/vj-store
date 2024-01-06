import isUppercase from 'validator/lib/isUppercase'
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
    if (!isUppercase(name[0])) {
      throw new EntityValidationError('Name must start with an uppercase letter')
    }
    if (!isAlpha(name)) {
      throw new EntityValidationError('Name must contain only letters')
    }
  }
}
