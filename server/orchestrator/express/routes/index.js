const routes = require("express").Router();
const EntertainMeController = require('../controllers/EntertainMeController');
const MovieRouter = require('../routes/MovieRouter');
const SeriesRouter = require('../routes/SeriesRouter');

routes.get('/entertainme', EntertainMeController.findAll)
routes.use('/movies', MovieRouter)
routes.use('/tv', SeriesRouter)

module.exports = routes;