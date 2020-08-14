const routes = require("express").Router();
const MoviesController = require('../controllers/MoviesController');

routes.get('/', MoviesController.getMovies)
routes.post('/', MoviesController.addMovie)
routes.get('/:id', MoviesController.getMovie)
routes.put('/:id', MoviesController.updateMovie)
routes.delete('/:id', MoviesController.deleteMovie)

module.exports = routes;