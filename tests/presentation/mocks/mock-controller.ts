import { faker } from '@faker-js/faker'
import { type HttpResponse, type Controller } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class ControllerSpy implements Controller {
  public httpResponse = HttpHelper.ok(faker.string.uuid)
  public request: any

  public handle = async(request: any): Promise<HttpResponse> => {
    this.request = request
    return this.httpResponse
  }
}
