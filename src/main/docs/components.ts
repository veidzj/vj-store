import { badRequest } from './components/bad-request'
import { forbidden } from './components/forbidden'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'

export default {
  badRequest,
  unauthorized,
  forbidden,
  serverError
}
