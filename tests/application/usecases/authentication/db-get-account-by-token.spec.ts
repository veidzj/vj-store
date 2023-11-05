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
  const sut = new DbGetAccountByToken(decrypterSpy, getAccountByTokenRepositorySpy)
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

    test('Should return null if Decrypter returns null', async() => {
      const { sut, decrypterSpy } = makeSut()
      decrypterSpy.plainText = null
      const accountId = await sut.getByToken(token, role)
      expect(accountId).toBeNull()
    })
  })

  describe('GetAccountByTokenRepository', () => {
    test('Should call GetAccountByTokenRepository with correct values', async() => {
      const { sut, getAccountByTokenRepositorySpy } = makeSut()
      await sut.getByToken(token, role)
      expect(getAccountByTokenRepositorySpy.token).toBe(token)
      expect(getAccountByTokenRepositorySpy.role).toBe(role)
    })

    test('Should return null if GetAccountByTokenRepository returns null', async() => {
      const { sut, getAccountByTokenRepositorySpy } = makeSut()
      getAccountByTokenRepositorySpy.id = null
      const accountId = await sut.getByToken(token, role)
      expect(accountId).toBeNull()
    })
  })
})
