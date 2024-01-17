import { type CheckProductByNameRepository } from '@/application/protocols/product/queries'

export class CheckProductByNameRepositorySpy implements CheckProductByNameRepository {
  public name: string
  public output: boolean = false

  public async checkByName(name: string): Promise<boolean> {
    this.name = name
    return this.output
  }
}
