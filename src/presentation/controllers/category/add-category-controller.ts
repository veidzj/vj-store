import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddCategory } from '@/domain/usecases/category'

export class AddCategoryController implements Controller {
  constructor(private readonly addCategory: AddCategory) {}

  public async handle(request: AddCategoryController.Request): Promise<Response> {
    await this.addCategory.add({ name: request.name })
    return HttpHelper.ok({ message: 'Category successfully added' })
  }
}

export namespace AddCategoryController {
  export interface Request {
    name: string
  }
}
