export interface ProductOutput {
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
  updatedAt: Date
}
