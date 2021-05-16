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
      email_validated: faker.datatype.boolean(),
    }
  })
  .state('email_validated', (user) => user.email_validated = true)
  .state('email_unvalidated', (user) => user.email_validated = false)
  .build()
