import { type UpdateLog } from '@/domain/common'

export class Account {
  private readonly Id: string
  private readonly Username: string
  private readonly Email: string
  private readonly Password: string
  private readonly IsActive: boolean
  private readonly CreatedAt: Date
  private readonly UpdateHistory: UpdateLog[]

  constructor(username: string, email: string, password: string) {
    this.Id = this.generateGUID()
    this.Username = username
    this.Email = email
    this.Password = password
    this.IsActive = true
    this.CreatedAt = new Date()
    this.UpdateHistory = []
  }

  private generateGUID(): string {
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return template.replace(/[xy]/g, (character) => {
      const randomHex = Math.random() * 16 | 0
      const value = character === 'x' ? randomHex : (randomHex & 0x3) | 0x8
      return value.toString(16)
    })
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
