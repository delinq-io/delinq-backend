import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 32).nullable().unique()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('avatar_url', 512).nullable()
      table.string('activation_code', 4).nullable()
      table.string('account_status').defaultTo('pending')
      table.dateTime('last_login').nullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
