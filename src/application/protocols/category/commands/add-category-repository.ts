export interface AddCategoryRepository {
  add: (input: AddCategoryRepository.Input) => Promise<void>
}

export namespace AddCategoryRepository {
  export interface Input {
    id: string
    name: string
    createdAt: Date
    updateHistory: []
  }
}
