import { type Controller } from '../protocols/controller'
import { type Validation } from '../protocols/validation'
import { type HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  constructor(private readonly validation: Validation) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    return {
      statusCode: 500,
      body: ''
    }
  }
}
