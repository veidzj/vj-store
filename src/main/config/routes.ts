import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export class Routes {
  public static async setup(app: Express): Promise<void> {
    const router = Router()
    app.use('/api', router)
    const routeFiles = readdirSync(join(__dirname, '../routes'))

    await Promise.all(routeFiles.map(async(file) => {
      if (!file.endsWith('.map')) {
        (await import(`../routes/${file}`)).default(router)
      }
    }))
  }
}
