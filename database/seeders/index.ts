import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdminSeeder from './Admin'
import ClicksSeeder from './Clicks'

export default class IndexSeeder extends BaseSeeder {
  public async run () {
    await new AdminSeeder(this.client).run()
    await new ClicksSeeder(this.client).run()
  }
}
