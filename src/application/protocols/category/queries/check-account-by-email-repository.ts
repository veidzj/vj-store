export interface CheckCategoryByNameRepository {
  checkByName: (name: string) => Promise<boolean>
}
