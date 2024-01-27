import { type Controller, type Response } from '@/presentation/protocols'
import { type LogErrorRepository } from '@/application/protocols/log'

export class LogErrorControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  public handle = async(request: object): Promise<Response> => {
    const response = await this.controller.handle(request)
    if (response.statusCode === 500) {
      await this.logErrorRepository.logError(response.body.stack!)
    }
    return response
  }
}
