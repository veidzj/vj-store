export interface AddProductRepository {
  add: (input: AddProductRepository.Input) => Promise<void>
}

export namespace AddProductRepository {
  export interface Input {
    id: string
    name: string
    description: string
    price: number
    discountPercentage: number
    quantity: number
    category: string
    slug: string
    imagesUrls: string[]
    createdAt: Date
    updateHistory: []
  }
}
