import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'

// -------------------------------------
// -- User 
// -------------------------------------
export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.image(),
      activationCode: '1234',
      accountStatus: faker.random.arrayElement(['pending', 'active']),
    }
  })
  .build()
