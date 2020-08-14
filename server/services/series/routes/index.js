const routes = require("express").Router();
const SeriesController = require('../controllers/SeriesController');

routes.get('/tv', SeriesController.getAll)
routes.post('/tv', SeriesController.add)
routes.get('/tv/:id', SeriesController.getOne)
routes.put('/tv/:id', SeriesController.update)
routes.delete('/tv/:id', SeriesController.delete)

module.exports = routes;