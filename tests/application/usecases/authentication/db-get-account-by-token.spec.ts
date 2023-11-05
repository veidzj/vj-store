import { faker } from '@faker-js/faker'
import { DecrypterSpy, GetAccountByTokenRepositorySpy } from '@/tests/application/mocks'
import { DbGetAccountByToken } from '@/application/usecases/authentication'

interface Sut {
  sut: DbGetAccountByToken
  decrypterSpy: DecrypterSpy
  getAccountByTokenRepositorySpy: GetAccountByTokenRepositorySpy
}

const makeSut = (): Sut => {
  const decrypterSpy = new DecrypterSpy()
  const getAccountByTokenRepositorySpy = new GetAccountByTokenRepositorySpy()
  const sut = new DbGetAccountByToken(decrypterSpy)
  return {
    sut,
    decrypterSpy,
    getAccountByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DbGetAccountByToken', () => {
  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.word.words()
  })

  describe('Decrypter', () => {
    test('Should call Decrypter with correct cipher text', async() => {
      const { sut, decrypterSpy } = makeSut()
      await sut.getByToken(token, role)
      expect(decrypterSpy.cipherText).toBe(token)
    })
  })
})
