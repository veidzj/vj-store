export interface UpdateProductControllerRequest {
  id: string
  name: string
  description: string
  price: number
  discountPercentage: number
  category: string
  imageUrls: string[]
  quantity: number
}
