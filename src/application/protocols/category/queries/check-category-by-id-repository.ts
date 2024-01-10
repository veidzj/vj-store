export interface CheckCategoryByIdRepository {
  checkById: (id: string) => Promise<boolean>
}
