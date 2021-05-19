import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clicks extends BaseSchema {
  protected tableName = 'clicks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('link_id').references('links.id').onDelete('cascade')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
