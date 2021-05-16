import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Logger from 'App/Logger'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready, when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
*/
export default class HttpLoggerProvider {
  constructor (protected app: ApplicationContract) {
  }

  public async boot () {
    const Server = this.app.container.use('Adonis/Core/Server')
    const AdonisLogger = this.app.container.use('Adonis/Core/Logger')

    Server.hooks.after(async (ctx) => {
      const logger = new Logger(ctx, AdonisLogger)
      logger.hook()
    })
  }
}
