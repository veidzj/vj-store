export interface GetAllCategories {
  getAll: () => Promise<GetAllCategories.Output[]>
}

export namespace GetAllCategories {
  export interface Output {
    id: string
    name: string
  }
}
