import { type Controller, type Response } from '@/presentation/protocols'
import { type UpdateCategory } from '@/domain/usecases/category/commands'
import { HttpHelper } from '@/presentation/helpers'

export class UpdateCategoryController implements Controller {
  constructor(private readonly updateCategory: UpdateCategory) {}

  public async handle(request: UpdateCategoryController.Request): Promise<Response> {
    try {
      await this.updateCategory.update(request)
      return HttpHelper.ok({})
    } catch (error) {
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace UpdateCategoryController {
  export interface Request {
    id: string
    name: string
  }
}
