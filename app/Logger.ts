import prettyMs from 'pretty-ms'
import onFinished from 'on-finished'

/**
 * Logs http request using AdonisJs in built logger
 */
export default class Logger {
  private request: any
  private res: any
  private Logger: any

  constructor ({ request, response }, Logger) {
    this.request = request
    this.res = response.response
    this.Logger = Logger
  }

  /**
   * Returns the diff in milliseconds using process.hrtime. Started
   * at time is required
   */
  private _diffHrTime (startedAt: any): number {
    const diff = process.hrtime(startedAt)
    return ((diff[0] * 1e9) + diff[1]) / 1e6
  }

  /**
   * Returns the log level based on the status code
   */
  private _getLogLevel (statusCode: number): string {
    if (statusCode < 400) {
      return 'info'
    }

    if (statusCode >= 400 && statusCode < 500) {
      return 'warn'
    }

    return 'error'
  }

  /**
   * Logs http request using the Adonis inbuilt logger
   */
  public log (url: string, method: string, statusCode: number, startedAt: any) {
    const ms = prettyMs(this._diffHrTime(startedAt))
    const logLevel = this._getLogLevel(statusCode)

    this.Logger[logLevel]('%s %s %s (%s)', statusCode, method, url, ms)
  }

  /**
   * Binds the hook to listen for finish event
   */
  public hook () {
    const start = process.hrtime()
    const url = this.request.url()
    const method = this.request.method()

    onFinished(this.res, (_, res) => {
      this.log(url, method, res.statusCode, start)
    })
  }
}
