import { type Response } from '@/presentation/protocols'

export interface Controller<T = object> {
  handle: (request: T) => Promise<Response>
}
