import { ValidationError } from '@/domain/errors'

export class InvalidParamError extends ValidationError {
  constructor(paramName: string, invalidReason: string = 'is invalid') {
    super(`${paramName} ${invalidReason}`)
  }
}
