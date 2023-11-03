import { type LogErrorRepository } from '@/application/protocols/db/dynamic/log'

export class LogErrorRepositorySpy implements LogErrorRepository {
  public stack: string

  public logError = async(stack: string): Promise<void> => {
    this.stack = stack
  }
}
