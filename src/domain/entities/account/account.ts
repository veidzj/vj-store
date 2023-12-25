import { type UpdateLog } from '@/domain/common'
import { AggregateRoot } from '@/domain/seedwork'
import { type AccountFields, AccountValidation } from '@/domain/entities/account'

export class Account extends AggregateRoot {
  private Username: string
  private Email: string
  private Password: string
  private IsActive: boolean = true
  private UpdateHistory: UpdateLog<AccountFields> | null = null

  constructor(username: string, email: string, password: string) {
    super()
    this.setUsername(username)
    this.setEmail(email)
    this.setPassword(password)
  }

  public getId(): string {
    return this.Id
  }

  public getUsername(): string {
    return this.Username
  }

  public getEmail(): string {
    return this.Email
  }

  public getPassword(): string {
    return this.Password
  }

  public isActive(): boolean {
    return this.IsActive
  }

  public getCreatedAt(): Date {
    return this.CreatedAt
  }

  public getUpdateHistory(): UpdateLog<AccountFields> | null {
    return this.UpdateHistory
  }

  public setUsername(username: string): void {
    AccountValidation.validateUsername(username)
    this.Username = username
  }

  public setEmail(email: string): void {
    this.Email = email
  }

  public setPassword(password: string): void {
    this.Password = password
  }

  public setUpdateHistory(fields: AccountFields[]): void {
    this.UpdateHistory = {
      Fields: fields,
      UpdatedAt: new Date()
    }
  }

  public activate(): void {
    this.IsActive = true
  }

  public deactivate(): void {
    this.IsActive = false
  }
}
