export interface CheckProductByNameRepository {
  checkByName: (name: string) => Promise<boolean>
}
