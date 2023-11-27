import { type Controller, type Validation, type Response } from '@/presentation/protocols'
import { type AddCategoryControllerRequest } from '@/presentation/protocols/category'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/domain/errors'
import { type AddCategory } from '@/domain/usecases/category'

export class AddCategoryController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {}

  public handle = async(request: AddCategoryControllerRequest): Promise<Response> => {
    try {
      this.validation.validate(request)
      await this.addCategory.add(request)
      return HttpHelper.ok({ message: 'Category successfully added' })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error)
    }
  }
}
