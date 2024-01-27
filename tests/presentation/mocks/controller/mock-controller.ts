import { faker } from '@faker-js/faker'

import { HttpHelper } from '@/presentation/helpers'
import { type Controller, type Response } from '@/presentation/protocols'

export class ControllerSpy implements Controller {
  public response = HttpHelper.ok({
    message: faker.word.words()
  })

  public request: object

  public async handle(request: object): Promise<Response> {
    this.request = request
    return this.response
  }
}
