export interface UpdateProduct {
  update: (input: UpdateProduct.Input) => Promise<void>
}

export namespace UpdateProduct {
  export interface Input {
    id: string
    name: string
    description: string
    price: number
    discountPercentage: number
    quantity: number
    category: string
    imagesUrls: string[]
  }
}
