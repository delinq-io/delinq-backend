import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class AdminSeeder extends BaseSeeder {
  public async run () {
    // 1. create admin account
    await UserFactory
      .merge({
        email: 'admin@gmail.com',
        password: 'password',
        username: 'Admin',
        avatarUrl: 'https://cdn.discordapp.com/avatars/255065617705467912/b4b7413f8c24e7a5f5fcdee5c2f626da.png',
        activationCode: undefined,
        accountStatus: 'active',
      })
      .create()
  }
}
