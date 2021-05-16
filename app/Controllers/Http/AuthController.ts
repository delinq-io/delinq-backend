import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

import EmailNotValidatedException from 'App/Exceptions/EmailNotValidatedException'
import RegisterFormValidator from 'App/Validators/RegisterFormValidator'
import User from 'App/Models/User'

export default class AuthController {
  /**
   * User register
   */
  public async register ({ request }: HttpContextContract) {
    const data = await request.validate(RegisterFormValidator)

    // create user
    const user = await User.create(data)
    Logger.info(`New user: ${user}`)

    // TODO: email confirmation
    // TODO: tests sur le formvalidator
  }

  /**
   * User login
   */
  public async login ({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberUser = !!request.input('remember_me')

    // check for credentials
    const user = await auth.attempt(email, password, rememberUser)

    // TODO: check if email is validated
    if (!user.email_validated) {
      throw new EmailNotValidatedException()
    }
  }

  /**
   * Retrieve curently signed-in user
   */
  public async getUser ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return { user }
  }

  /**
   * Disconnect current user
   */
  public async logout ({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
