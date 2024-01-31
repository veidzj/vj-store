export interface CheckProductBySlugRepository {
  checkBySlug: (slug: string) => Promise<boolean>
}
