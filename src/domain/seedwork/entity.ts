import crypto from 'crypto'

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
    const bytes = crypto.randomBytes(16)
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80

    let guid = ''
    bytes.forEach((byte, index) => {
      guid += byte.toString(16).padStart(2, '0')
      if (index === 3 || index === 5 || index === 7 || index === 9) {
        guid += '-'
      }
    })

    return guid
  }
}
