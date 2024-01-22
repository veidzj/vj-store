export interface CheckProductByIdRepository {
  checkById: (id: string) => Promise<boolean>
}
