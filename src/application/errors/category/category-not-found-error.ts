import { CategoryError } from '@/domain/errors'

export class CategoryNotFoundError extends CategoryError {
  constructor() {
    super('Category not found')
    this.name = this.constructor.name
  }
}
