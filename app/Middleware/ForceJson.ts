import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForceJson {
  public async handle ({ request }: HttpContextContract, next: () => Promise<void>) {
    request.request.headers.accept = 'application/json'
    await next()
  }
}
