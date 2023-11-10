import { ValidationError } from '@/domain/errors'

export class MissingParamError extends ValidationError {
  constructor(paramName: string) {
    super(`${paramName} is required`)
  }
}
