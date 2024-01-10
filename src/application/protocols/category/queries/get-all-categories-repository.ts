export interface GetAllCategoriesRepository {
  getAll: () => Promise<GetAllCategoriesRepository.Output[]>
}

export namespace GetAllCategoriesRepository {
  export interface Output {
    id: string
    name: string
  }
}
