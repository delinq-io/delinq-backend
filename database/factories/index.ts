import { DateTime } from 'luxon'
import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'
import Workspace from 'App/Models/Workspace'
import Link from 'App/Models/Link'
import Click from 'App/Models/Click'

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

// -------------------------------------
// -- Workspace 
// -------------------------------------
export const WorkspaceFactory = Factory
  .define(Workspace, ({ faker }) => {
    return {
      name: faker.company.companyName(),
    }
  })
  .build()

// -------------------------------------
// -- Link 
// -------------------------------------
export const LinkFactory = Factory
  .define(Link, ({ faker }) => {
    return {
      title: faker.lorem.words(2),
      longUrl: faker.internet.url(),
    }
  })
  .build()

// -------------------------------------
// -- Link 
// -------------------------------------
export const ClickFactory = Factory
  .define(Click, ({ faker }) => {
    const d = new Date()
    d.setDate(d.getDate() - 60)

    return {
      createdAt: DateTime.fromJSDate(faker.date.between(d, new Date())),
    }
  })
  .build()
