import { type CheckProductByNameRepository } from '@/application/protocols/product/queries'
import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type AddProductRepository } from '@/application/protocols/product/commands'
import { Product } from '@/domain/entities/product'
import { type AddProduct } from '@/domain/usecases/product/commands'
import { ProductAlreadyExistsError } from '@/domain/errors/product'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class DbAddProduct implements AddProduct {
  constructor(
    private readonly checkProductByNameRepository: CheckProductByNameRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly addProductRepository: AddProductRepository
  ) {}

  public async add(input: AddProduct.Input): Promise<void> {
    const product = new Product(input.name, input.description, input.price, input.discountPercentage, input.quantity, input.category, input.imagesUrls)
    const productExists = await this.checkProductByNameRepository.checkByName(input.name)
    if (productExists) {
      throw new ProductAlreadyExistsError()
    }
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(input.category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    const addProductRepositoryInput = this.makeAddProductRepositoryInput(product)
    await this.addProductRepository.add(addProductRepositoryInput)
  }

  private makeAddProductRepositoryInput(product: Product): AddProductRepository.Input {
    return {
      id: product.getId(),
      description: product.getDescription(),
      price: product.getPrice(),
      discountPercentage: product.getDiscountPercentage(),
      quantity: product.getQuantity(),
      category: product.getCategory(),
      imagesUrls: product.getImagesUrls(),
      slug: product.getSlug(),
      name: product.getName(),
      createdAt: product.getCreatedAt(),
      updateHistory: []
    }
  }
}
