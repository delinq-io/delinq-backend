import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterFormValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    username: schema.string({}, [
      rules.unique({ table: 'users', column: 'username' }),
      rules.required(),
      rules.maxLength(32),
    ]),
    email: schema.string({}, [
      rules.unique({ table: 'users', column: 'email' }),
      rules.required(),
      rules.maxLength(255),
      rules.email(),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.maxLength(64),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'username.unique': 'Username already used.',
    'username.required': 'Username is required.',
    'username.maxLength': 'Username can\'t be more than 32 characters long.',
    'email.unique': 'Email already used.',
    'email.required': 'Email is required.',
    'email.maxLength': 'Email can\'t be more than 255 characters long.',
    'email.email': 'Email isn\'t valid.',
    'password.required': 'Password is required.',
    'password.maxLength': 'Passwords can\'t be more than 255 characters long.',
  }
}
