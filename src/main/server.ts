import 'module-alias/register'

import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

const mongoHelper = MongoHelper.getInstance()

mongoHelper.connect(env.mongoUrl)
  .then(async() => {
    const { App } = await import('./config/app')
    const app = await App.setup()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
