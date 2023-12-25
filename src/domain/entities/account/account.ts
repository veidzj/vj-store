import { type UpdateLog } from '@/domain/common'
import { AggregateRoot } from '@/domain/seedwork'

export class Account extends AggregateRoot {
  private Username: string
  private Email: string
  private Password: string
  private IsActive: boolean

  constructor(username: string, email: string, password: string) {
    super()
    this.setUsername(username)
    this.setEmail(email)
    this.setPassword(password)
    this.setIsActive(true)
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

  public getUpdateHistory(): UpdateLog[] {
    return this.UpdateHistory
  }

  public setUsername(username: string): void {
    this.Username = username
  }

  public setEmail(email: string): void {
    this.Email = email
  }

  public setPassword(password: string): void {
    this.Password = password
  }

  public setIsActive(isActive: boolean): void {
    this.IsActive = isActive
  }
}
