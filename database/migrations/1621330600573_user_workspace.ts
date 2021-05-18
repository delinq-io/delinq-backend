import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserWorkspace extends BaseSchema {
  protected tableName = 'user_workspace'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('users.id').onDelete('cascade')
      table.integer('workspace_id').references('workspaces.id').onDelete('cascade')
      table.enu('role', ['member', 'owner'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
