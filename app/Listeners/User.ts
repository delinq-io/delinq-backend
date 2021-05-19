import { EventsList } from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class User {
  public async onNewUser (user: EventsList['new:user']) {
    user.activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    await user.save()

    await Mail.send((message) => {
      message
        .from('noreply@delinq.io')
        .to(user.email)
        .subject('Verify your delinq.io account!')
        .htmlView('emails/validate-email', {
          user: { username: user.username },
          code: user.activationCode,
        })
    })
  }
}
