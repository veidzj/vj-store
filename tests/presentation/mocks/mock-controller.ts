import { faker } from '@faker-js/faker'

import { type Response, type Controller } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class ControllerSpy implements Controller {
  public response = HttpHelper.ok(faker.string.uuid)
  public request: any

  public handle = async(request: any): Promise<Response> => {
    this.request = request
    return this.response
  }
}
