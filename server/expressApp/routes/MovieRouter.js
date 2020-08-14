const routes = require("express").Router();
const MovieController = require('../controllers/MovieController');

routes.get('/', MovieController.getMovies)
routes.post('/', MovieController.addMovie)
routes.get('/:id', MovieController.getMovie)
routes.put('/:id', MovieController.updateMovie)
routes.delete('/:id', MovieController.deleteMovie)

module.exports = routes;