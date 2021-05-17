import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'

import PendingAccountException from 'App/Exceptions/PendingAccountException'
import UserAlreadyActiveException from 'App/Exceptions/UserAlreadyActiveException'
import InvalidActivationCodeException from 'App/Exceptions/InvalidActivationCodeException'
import RegisterFormValidator from 'App/Validators/RegisterFormValidator'
import ValidateFormValidator from 'App/Validators/ValidateFormValidator'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class AuthController {
  /**
   * User register
   */
  public async register ({ request }: HttpContextContract) {
    const data = await request.validate(RegisterFormValidator)

    const user = await User.create(data)

    Event.emit('new:user', user)
  }

  /**
   * Activate user account
   */
  public async activate ({ request }: HttpContextContract) {
    const data = await request.validate(ValidateFormValidator)

    const user = await User.findByOrFail('email', data.email)

    if (user.accountStatus !== 'pending') {
      throw new UserAlreadyActiveException()
    }

    if (user.activationCode !== data.code) {
      throw new InvalidActivationCodeException()
    }

    user.accountStatus = 'active'
    await user.save()
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

    if (user.accountStatus === 'pending') {
      throw new PendingAccountException()
    }

    const lastLogin = user.lastLogin
    user.lastLogin = DateTime.now()
    await user.save()

    if (!lastLogin) {
      return { firstLogin: true }
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
