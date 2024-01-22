import MockDate from 'mockdate'

import { throwError } from '@/tests/test-helper'
import { CheckProductByIdRepositorySpy } from '@/tests/application/mocks/product/queries'
import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { UpdateProductRepositorySpy } from '@/tests/application/mocks/product/commands'
import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { DbUpdateProduct } from '@/application/usecases/product/commands'
import { ProductHelper } from '@/domain/entities/product'
import { ProductNotFoundError } from '@/domain/errors/product'
import { CategoryNotFoundError } from '@/domain/errors/category'

interface Sut {
  sut: DbUpdateProduct
  checkProductByIdRepositorySpy: CheckProductByIdRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  updateProductRepositorySpy: UpdateProductRepositorySpy
}

const makeSut = (): Sut => {
  const checkProductByIdRepositorySpy = new CheckProductByIdRepositorySpy()
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  checkCategoryByNameRepositorySpy.output = true
  const updateProductRepositorySpy = new UpdateProductRepositorySpy()
  const sut = new DbUpdateProduct(checkProductByIdRepositorySpy, checkCategoryByNameRepositorySpy, updateProductRepositorySpy)
  return {
    sut,
    checkProductByIdRepositorySpy,
    checkCategoryByNameRepositorySpy,
    updateProductRepositorySpy
  }
}

describe('DbUpdateProduct', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('CheckProductByIdRepository', () => {
    test('Should call CheckProductByIdRepository with correct id', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(checkProductByIdRepositorySpy.id).toBe(updateProductInput.id)
    })

    test('Should throw ProductNotFoundError if CheckProductByIdRepository returns false', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      checkProductByIdRepositorySpy.output = false
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow(new ProductNotFoundError())
    })

    test('Should throw if CheckProductByIdRepository throws', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      jest.spyOn(checkProductByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('CheckCategoryByNameRepository', () => {
    test('Should call CheckCategoryByNameRepository with correct name', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toBe(updateProductInput.category)
    })

    test('Should throw CategoryNotFoundError if CheckCategoryByNameRepository returns false', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      checkCategoryByNameRepositorySpy.output = false
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow(new CategoryNotFoundError())
    })

    test('Should throw if CheckCategoryByNameRepository throws', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('UpdateProductRepository', () => {
    test('Should call UpdateProductRepository with correct values', async() => {
      const { sut, updateProductRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(updateProductRepositorySpy.input.id).toBe(updateProductInput.id)
      expect(updateProductRepositorySpy.input.name).toBe(updateProductInput.name)
      expect(updateProductRepositorySpy.input.description).toBe(updateProductInput.description)
      expect(updateProductRepositorySpy.input.price).toBe(updateProductInput.price)
      expect(updateProductRepositorySpy.input.discountPercentage).toBe(updateProductInput.discountPercentage)
      expect(updateProductRepositorySpy.input.quantity).toBe(updateProductInput.quantity)
      expect(updateProductRepositorySpy.input.category).toBe(updateProductInput.category)
      expect(updateProductRepositorySpy.input.slug).toBe(ProductHelper.generateSlug(updateProductInput.name))
      expect(updateProductRepositorySpy.input.imagesUrls).toBe(updateProductInput.imagesUrls)
      expect(updateProductRepositorySpy.input.updatedAt).toEqual(new Date())
    })

    test('Should throw if UpdateProductRepository throws', async() => {
      const { sut, updateProductRepositorySpy } = makeSut()
      jest.spyOn(updateProductRepositorySpy, 'update').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
