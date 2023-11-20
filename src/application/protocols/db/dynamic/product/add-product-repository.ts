export interface AddProductRepository {
  add: (input: AddProductRepository.Input) => Promise<void>
}

export namespace AddProductRepository {
  export interface Input {
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    imageUrls: string[]
    quantity: number
  }
}
