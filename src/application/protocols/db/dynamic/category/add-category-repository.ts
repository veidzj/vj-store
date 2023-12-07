export interface AddCategoryRepository {
  add: (input: AddCategoryRepository.Input) => Promise<void>
}

export namespace AddCategoryRepository {
  export interface Input {
    name: string
    addedAt: Date
  }
}
