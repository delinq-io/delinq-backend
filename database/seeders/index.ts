import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdminSeeder from './Admin'

export default class IndexSeeder extends BaseSeeder {
  public async run () {
    await new AdminSeeder(this.client).run()
  }
}
