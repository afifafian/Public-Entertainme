const routes = require("express").Router();
const MovieRouter = require('./MovieRouter');
const SeriesRouter = require('./SeriesRouter');

routes.use('/movies', MovieRouter)
routes.use('/tv', SeriesRouter)

module.exports = routes;