import { type UpdateLog } from '@/domain/common'
import { AggregateRoot } from '@/domain/seedwork'

export class Account extends AggregateRoot {
  private readonly Username: string
  private readonly Email: string
  private readonly Password: string
  private readonly IsActive: boolean

  constructor(username: string, email: string, password: string) {
    super()
    this.Username = username
    this.Email = email
    this.Password = password
    this.IsActive = true
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

  public getIsActive(): boolean {
    return this.IsActive
  }

  public getCreatedAt(): Date {
    return this.CreatedAt
  }

  public getUpdateHistory(): UpdateLog[] {
    return this.UpdateHistory
  }
}
