import { Exception } from '@poppinss/utils'

const code = 'E_USER_ALREADY_ACTIVE_EXCEPTION'
const status = 401
const message = 'Your account is already active.'

export default class UserAlreadyActiveException extends Exception {
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
