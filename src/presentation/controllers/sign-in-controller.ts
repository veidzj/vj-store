import { type Controller } from '@/presentation/protocols/controller'
import { type Validation } from '@/presentation/protocols/validation'
import { type HttpResponse } from '@/presentation/protocols/http'

export class SignInController implements Controller {
  constructor(private readonly validation: Validation) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    this.validation.validate(request)
    return {
      statusCode: 400,
      body: ''
    }
  }
}
