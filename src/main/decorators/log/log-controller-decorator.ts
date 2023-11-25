import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { type LogErrorRepository } from '@/application/protocols/db/dynamic/log'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
