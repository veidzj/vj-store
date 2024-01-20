import { type CheckProductByIdRepository } from '@/application/protocols/product/queries'
import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type UpdateProductRepository } from '@/application/protocols/product/commands'
import { type UpdateProduct } from '@/domain/usecases/product/commands'
import { ProductNotFoundError } from '@/domain/errors/product'
import { CategoryNotFoundError } from '@/domain/errors/category'
import { Product } from '@/domain/entities/product'

export class DbUpdateProduct implements UpdateProduct {
  constructor(
    private readonly checkProductByIdRepository: CheckProductByIdRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly updateProductRepository: UpdateProductRepository
  ) {}

  public async update(input: UpdateProduct.Input): Promise<void> {
    const product = new Product(input.name, input.description, input.price, input.discountPercentage, input.quantity, input.category, input.imagesUrls)
    const productExists = await this.checkProductByIdRepository.checkById(input.id)
    if (!productExists) {
      throw new ProductNotFoundError()
    }
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(input.category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    const updateProductRepositoryInput = this.makeUpdateProductRepositoryInput(input.id, product)
    await this.updateProductRepository.update(updateProductRepositoryInput)
  }

  private makeUpdateProductRepositoryInput(id: string, product: Product): UpdateProductRepository.Input {
    return {
      id,
      description: product.getDescription(),
      price: product.getPrice(),
      discountPercentage: product.getDiscountPercentage(),
      quantity: product.getQuantity(),
      category: product.getCategory(),
      imagesUrls: product.getImagesUrls(),
      slug: product.getSlug(),
      name: product.getName(),
      updatedAt: product.getUpdatedAt()
    }
  }
}
