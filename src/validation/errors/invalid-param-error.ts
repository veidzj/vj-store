export class InvalidParamError extends Error {
  constructor(paramName: string, invalidReason: string = 'is invalid') {
    super(`${paramName} ${invalidReason}`)
    this.name = 'InvalidParamError'
  }
}
