import { type LogErrorRepository } from '@/application/protocols/log'

export class LogErrorRepositorySpy implements LogErrorRepository {
  public stack: string

  public async logError(stack: string): Promise<void> {
    this.stack = stack
  }
}
