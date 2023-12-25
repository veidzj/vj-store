import { type UpdateLog } from '@/domain/common'

export abstract class Entity {
  public readonly Id: string
  public readonly CreatedAt: Date
  public readonly UpdateHistory: UpdateLog[]

  constructor() {
    this.Id = this.generateGUID()
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
}
