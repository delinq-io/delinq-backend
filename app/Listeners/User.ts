import { EventsList } from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'
import Logger from '@ioc:Adonis/Core/Logger'

export default class User {
  public async onNewUser (user: EventsList['new:user']) {
    user.activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    await user.save()

    Logger.info(`${user.email}'s code is ${user.activationCode}`)

    await Mail.send((message) => {
      message
        .from('noreply@delinq.io')
        .to(user.email)
        .subject('delinq.io email verification code')
        .htmlView('emails/validate-email', {
          user: { username: user.username },
          code: user.activationCode,
        })
    })
  }
}
