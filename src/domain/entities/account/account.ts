import { type UpdateLog } from '@/domain/common'
import { AggregateRoot } from '@/domain/seedwork'
import { type AccountFields, AccountValidation } from '@/domain/entities/account'

export class Account extends AggregateRoot {
  private username: string
  private email: string
  private password: string
  private readonly role: string = 'User'
  private isActive: boolean = true
  private updateHistory: UpdateLog<AccountFields> | null = null

  constructor(username: string, email: string, password: string) {
    super()
    this.setUsername(username)
    this.setEmail(email)
    this.setPassword(password)
  }

  public getId(): string {
    return this.id
  }

  public getUsername(): string {
    return this.username
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public getRole(): string {
    return this.role
  }

  public getIsActive(): boolean {
    return this.isActive
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdateHistory(): UpdateLog<AccountFields> | null {
    return this.updateHistory
  }

  public setUsername(username: string): void {
    AccountValidation.validateUsername(username)
    this.username = username
  }

  public setEmail(email: string): void {
    AccountValidation.validateEmail(email)
    this.email = email
  }

  public setPassword(password: string): void {
    AccountValidation.validatePassword(password)
    this.password = password
  }

  public setUpdateHistory(fields: AccountFields[]): void {
    this.updateHistory = {
      fields,
      updatedAt: new Date()
    }
  }

  public activate(): void {
    this.isActive = true
  }

  public deactivate(): void {
    this.isActive = false
  }
}
