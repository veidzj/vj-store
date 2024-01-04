import { type UpdateLog } from '@/domain/common'
import { AggregateRoot } from '@/domain/seedwork'
import { CategoryValidation, type CategoryFields } from '@/domain/entities/category'

export class Category extends AggregateRoot {
  private name: string
  private updateHistory: UpdateLog<CategoryFields> | [] = []

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

  public getUpdateHistory(): UpdateLog<CategoryFields> | [] {
    return this.updateHistory
  }

  public setName(name: string): void {
    CategoryValidation.validateName(name)
    this.name = name
  }

  public setUpdateHistory(fields: CategoryFields[]): void {
    this.updateHistory = {
      fields,
      updatedAt: new Date()
    }
  }
}
