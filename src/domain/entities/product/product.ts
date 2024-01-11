import { AggregateRoot } from '@/domain/seedwork'
import { type UpdateLog } from '@/domain/common'
import { type ProductFields, ProductHelper, ProductValidation } from '@/domain/entities/product'

export class Product extends AggregateRoot {
  private name: string
  private description: string
  private price: number
  private discountPercentage: number
  private quantity: number
  private category: string
  private slug: string
  private imagesUrls: string[] = []
  private updateHistory: UpdateLog<ProductFields> | [] = []

  constructor(name: string, description: string, price: number, discountPercentage: number, quantity: number, category: string, imageUrls?: string[]) {
    super()
    this.setName(name)
    this.setDescription(description)
    this.setPrice(price)
    this.setDiscountPercentage(discountPercentage)
    this.setQuantity(quantity)
    this.setCategory(category)
    this.setSlug(name)
    if (imageUrls) {
      this.setImagesUrls(imageUrls)
    }
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getDescription(): string {
    return this.description
  }

  public getPrice(): number {
    return this.price
  }

  public getDiscountPercentage(): number {
    return this.discountPercentage
  }

  public getQuantity(): number {
    return this.quantity
  }

  public getCategory(): string {
    return this.category
  }

  public getSlug(): string {
    return this.slug
  }

  public getImagesUrls(): string[] {
    return this.imagesUrls
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdateHistory(): UpdateLog<ProductFields> | [] {
    return this.updateHistory
  }

  public setName(name: string): void {
    ProductValidation.validateName(name)
    this.name = name
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public setPrice(price: number): void {
    this.price = price
  }

  public setDiscountPercentage(discountPercentage: number): void {
    this.discountPercentage = discountPercentage
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity
  }

  public setCategory(category: string): void {
    this.category = category
  }

  public setImagesUrls(imagesUrls: string[]): void {
    this.imagesUrls = imagesUrls
  }

  public setUpdateHistory(fields: ProductFields[]): void {
    this.updateHistory = {
      fields,
      updatedAt: new Date()
    }
  }

  private setSlug(name: string): void {
    this.slug = ProductHelper.generateSlug(name)
  }
}
