import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterFormValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    email: schema.string({}, [
      rules.required(),
      rules.email(),
    ]),
    code: schema.string({}, [
      rules.required(),
      rules.minLength(4),
      rules.maxLength(4),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {

    'email.required': 'Your email is required.',
    'email.email': 'Your email isn\'t valid.',
    'code.required': 'Validation code is required.',
    'code.minLength': 'Invalid code.',
    'code.maxLength': 'Invalid code.',
  }
}
