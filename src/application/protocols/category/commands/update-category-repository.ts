import { type UpdateLog } from '@/domain/common'
import { type CategoryFields } from '@/domain/entities/category'

export interface UpdateCategoryRepository {
  update: (input: UpdateCategoryRepository.Input) => Promise<void>
}

export namespace UpdateCategoryRepository {
  export interface Input {
    id: string
    name: string
    updateHistory: UpdateLog<CategoryFields> | []
  }
}
