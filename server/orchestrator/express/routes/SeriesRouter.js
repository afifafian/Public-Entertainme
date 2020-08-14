const routes = require("express").Router();
const SeriesController = require('../controllers/SeriesController');

routes.get('/', SeriesController.getSeries)
routes.post('/', SeriesController.addSeries)
routes.get('/:id', SeriesController.getOneSeries)
routes.put('/:id', SeriesController.updateSeries)
routes.delete('/:id', SeriesController.deleteSeries)

module.exports = routes;