import { faker } from '@faker-js/faker'

import { type GetAccountEmailByToken } from '@/domain/usecases/account/queries'

export class GetAccountEmailByTokenSpy implements GetAccountEmailByToken {
  public accessToken: string
  public role?: string
  public output = faker.string.uuid()

  public getByToken = async(accessToken: string, role?: string): Promise<string> => {
    this.accessToken = accessToken
    this.role = role
    return this.output
  }
}
