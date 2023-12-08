import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'VJ Store',
    description: 'E-Commerce API using TypeScript, TDD and Clean Architecture',
    version: '0.4.0'
  },
  license: {
    name: 'GNU General Public License v3.0',
    url: 'https://www.gnu.org/licenses/gpl-3.0.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Auth'
  }],
  paths,
  schemas,
  components
}
