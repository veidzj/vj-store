import { type AddCategory } from '@/domain/usecases/category'

export class AddCategoryController {
  constructor(private readonly addCategory: AddCategory) {}

  public async handle(request: AddCategoryController.Request): Promise<void> {
    await this.addCategory.add(request.name)
  }
}

export namespace AddCategoryController {
  export interface Request {
    name: string
  }
}
