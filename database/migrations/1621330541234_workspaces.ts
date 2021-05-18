import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Workspaces extends BaseSchema {
  protected tableName = 'workspaces'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 32).notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
