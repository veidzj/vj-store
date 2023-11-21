export interface AddCategory {
  add: (input: AddCategory.Input) => Promise<void>
}

export namespace AddCategory {
  export interface Input {
    name: string
  }
}
