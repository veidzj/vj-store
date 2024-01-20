export interface UpdateProductRepository {
  update: (input: UpdateProductRepository.Input) => Promise<void>
}

export namespace UpdateProductRepository {
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
    updatedAt: Date
  }
}
