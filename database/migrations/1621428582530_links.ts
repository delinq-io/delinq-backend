import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Links extends BaseSchema {
  protected tableName = 'links'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 64).nullable()
      table.string('long_url', 512).notNullable()
      table.string('key', 512).notNullable().unique().index()
      table.integer('user_id').references('users.id').onDelete('cascade')
      table.integer('workspace_id').references('workspaces.id').onDelete('cascade')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
