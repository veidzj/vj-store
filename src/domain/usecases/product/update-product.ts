export interface UpdateProduct {
  update: (input: UpdateProduct.Input) => Promise<void>
}

export namespace UpdateProduct {
  export interface Input {
    productId: string
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    imageUrls: string[]
    quantity: number
  }
}
