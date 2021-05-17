import { Exception } from '@poppinss/utils'

const code = 'E_PENDING_ACCOUNT_EXCEPTION'
const status = 401
const message = 'Please validate your email address.'

export default class PendingAccountException extends Exception {
  constructor () {
    super(message, status, code)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  handle (_: any, { response }: any) {
    return response.status(status).send({
      errors: [{
        status: status,
        code: code,
        message: message,
      }],
    })
  }
}
