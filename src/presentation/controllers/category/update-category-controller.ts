import { type UpdateCategory } from '@/domain/usecases/category/commands'

export class UpdateCategoryController {
  constructor(private readonly updateCategory: UpdateCategory) {}

  public async handle(request: UpdateCategoryController.Request): Promise<void> {
    await this.updateCategory.update(request)
  }
}

export namespace UpdateCategoryController {
  export interface Request {
    id: string
    name: string
  }
}
