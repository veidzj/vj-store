import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/domain/errors'
import { type AddCategory } from '@/domain/usecases/category'

export class AddCategoryController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {}

  public handle = async(request: AddCategoryController.Request): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)
      await this.addCategory.add(request)
      return this.httpHelper.ok({ message: 'Category successfully added' })
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
