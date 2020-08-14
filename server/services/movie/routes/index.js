const routes = require("express").Router();
const MovieController = require('../controllers/MoviesController')

routes.get('/movies', MovieController.getAll)
routes.post('/movies', MovieController.create)
routes.get('/movies/:id', MovieController.getOne)
routes.put('/movies/:id', MovieController.update)
routes.delete('/movies/:id', MovieController.delete)

module.exports = routes;