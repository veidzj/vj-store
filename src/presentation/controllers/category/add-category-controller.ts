import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/domain/errors'

export class AddCategoryController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly validation: Validation
  ) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)
      return this.httpHelper.ok({ })
    } catch (error) {
      if (error instanceof ValidationError) {
        return this.httpHelper.badRequest(error)
      }
      return this.httpHelper.serverError(error)
    }
  }
}

export namespace AddCategoryController {
  export interface Request {
    name: string
  }
}
