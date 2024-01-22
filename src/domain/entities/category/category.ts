import { AggregateRoot } from '@/domain/seedwork'
import { CategoryValidation, CategoryHelper } from '@/domain/entities/category'

export class Category extends AggregateRoot {
  private name: string

  constructor(name: string) {
    super()
    this.setName(name)
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setName(name: string): void {
    CategoryValidation.validateName(name)
    this.name = CategoryHelper.formatName(name)
  }
}
