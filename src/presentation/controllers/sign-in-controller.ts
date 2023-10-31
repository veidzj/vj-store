import { type Controller } from '@/presentation/protocols/controller'
import { type Validation } from '@/presentation/protocols/validation'
import { type HttpResponse } from '@/presentation/protocols/http'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignInController implements Controller {
  constructor(private readonly validation: Validation) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return {
      statusCode: 400,
      body: ''
    }
  }
}
