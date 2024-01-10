export interface UpdateCategory {
  update: (input: UpdateCategory.Input) => Promise<void>
}

export namespace UpdateCategory {
  export interface Input {
    id: string
    name: string
  }
}
