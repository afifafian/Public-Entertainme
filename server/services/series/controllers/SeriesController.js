const Series = require('../models/Series');

class SeriesController {
    static getAll (req, res) {
        Series.findAll()
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
    static getOne (req, res) {
        Series.findById(req.params.id)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
    static add (req, res) {
        const newSeries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: req.body.tags.split(",")
        }
        Series.create(newSeries)
        .then(function(data) {
            res.status(201).json(data.ops[0])
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
    static update (req, res) {
        const updatedSeries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: req.body.tags.split(",")
        };
        const id = req.params.id;
        Series.update(id, updatedSeries)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
    static delete (req, res) {
        Series.destroy(req.params.id)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }

}

module.exports = SeriesController;