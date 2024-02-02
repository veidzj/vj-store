import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'VJ Store',
    description: 'E-Commerce API using TypeScript, DDD, TDD and Clean Architecture',
    version: '0.11.1'
  },
  license: {
    name: 'GNU General Public License v3.0',
    url: 'https://www.gnu.org/licenses/gpl-3.0.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Account'
  }, {
    name: 'Category'
  }, {
    name: 'Product'
  }],
  paths,
  schemas,
  components
}
