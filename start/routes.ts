/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file.
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

// -------------------------------------
// Random routes
// -------------------------------------

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

// -------------------------------------
// Authentication routes
// -------------------------------------

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/activate', 'AuthController.activate')

  Route.post('/logout', 'AuthController.logout')
  Route.post('/login', 'AuthController.login')
  Route.get('/user', 'AuthController.getUser').middleware('auth')
}).prefix('auth')

// -------------------------------------
// Current user routes
// -------------------------------------

Route.group(() => {
  Route.get('/workspaces', 'MeController.getWorkspaces')
}).prefix('me').middleware(['auth'])

// -------------------------------------
// Workspaces routes
// -------------------------------------

Route.group(() => {
  Route.post('/', 'WorkspacesController.create')

  Route.get('/:name', 'WorkspacesController.getByName')
}).prefix('workspaces').middleware(['auth'])

// -------------------------------------
// Link routes
// -------------------------------------

Route.get('/:key', 'LinksController.getByKey')

Route.group(() => {
  Route.post('/', 'LinksController.create')
}).prefix('links').middleware(['auth'])

// -------------------------------------
// Click routes
// -------------------------------------

Route.group(() => {
  Route.get('/:workspaceName/date/:date', 'ClicksController.getDate')
}).prefix('clicks').middleware(['auth'])
