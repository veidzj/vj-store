export interface UpdateCategoryRepository {
  update: (input: UpdateCategoryRepository.Input) => Promise<void>
}

export namespace UpdateCategoryRepository {
  export interface Input {
    id: string
    name: string
  }
}
