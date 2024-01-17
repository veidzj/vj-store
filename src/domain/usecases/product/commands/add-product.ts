export interface AddProduct {
  add: (input: AddProduct.Input) => Promise<void>
}

export namespace AddProduct {
  export interface Input {
    name: string
    description: string
    price: number
    discountPercentage: number
    quantity: number
    category: string
    imagesUrls: string[]
  }
}
