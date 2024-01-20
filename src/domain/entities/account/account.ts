import { AggregateRoot } from '@/domain/seedwork'
import { AccountValidation, AccountHelper } from '@/domain/entities/account'

export class Account extends AggregateRoot {
  private username: string
  private email: string
  private password: string
  private readonly role: string = 'user'
  private isActive: boolean = true

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

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setUsername(username: string): void {
    AccountValidation.validateUsername(username)
    this.username = AccountHelper.formatUsername(username)
  }

  public setEmail(email: string): void {
    AccountValidation.validateEmail(email)
    this.email = email
  }

  public setPassword(password: string): void {
    AccountValidation.validatePassword(password)
    this.password = password
  }

  public activate(): void {
    this.isActive = true
  }

  public deactivate(): void {
    this.isActive = false
  }
}
