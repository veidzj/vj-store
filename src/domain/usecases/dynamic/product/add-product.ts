export interface AddProduct {
  add: (input: AddProduct.Input) => Promise<void>
}

export namespace AddProduct {
  export interface Input {
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    imageUrls: string[]
    quantity: number
    addedAt: Date
  }
}
