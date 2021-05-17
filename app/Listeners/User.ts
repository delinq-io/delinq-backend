import { EventsList } from '@ioc:Adonis/Core/Event'
// import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'

export default class User {
  public async onNewUser (user: EventsList['new:user']) {
    user.activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    await user.save()

    // TODO: send email
    Logger.info(`${user.email}'s code is ${user.activationCode}`)
  }
}
