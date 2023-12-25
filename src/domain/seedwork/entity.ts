export abstract class Entity {
  public readonly Id: string
  public readonly CreatedAt: Date

  constructor() {
    this.Id = this.generateGUID()
    this.CreatedAt = new Date()
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
