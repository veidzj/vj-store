export interface UpdateProductRepository {
  update: (input: UpdateProductRepository.Input) => Promise<void>
}

export namespace UpdateProductRepository {
  export interface Input {
    productId: string
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    imageUrls: string[]
    quantity: number
    slug: string
  }
}
