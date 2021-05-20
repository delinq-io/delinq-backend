import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateWorkspaceFormValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({ table: 'workspaces', column: 'name' }),
      rules.required(),
      rules.maxLength(32),
    ]),
    timezone: schema.string({}, [
      rules.required(),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'name.unique': 'Name not available.',
    'name.required': 'Name is required.',
    'name.maxLength': 'Name can\'t be more than 32 characters long.',
    'timezone.required': 'Timezone is required.',
  }
}
