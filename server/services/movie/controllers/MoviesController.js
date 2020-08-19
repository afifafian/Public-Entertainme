const Movies = require('../models/Movies');

class MovieController {
    static getAll(req, res) {
        Movies.findAll()
        .then(function(data) {
            return res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        })
    }

    static getOne(req, res) {
        Movies.findOne(req.params.id)
        .then(function(data) {
            return res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        })
    }

    static create(req, res) {
        const newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: req.body.tags.split(",")
        }
        Movies.insertOne(newMovie)
        .then(function(data) {
            return res.status(201).json(data.ops[0])
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        })
    }

    static update(req, res) {
        const updatedMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: req.body.tags.split(",")
        };
        const id = req.params.id;
        Movies.findOneAndUpdate(id, updatedMovie)
        .then(function(data) {
            return res.status(200).json(data.value)
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        })
    }

    static delete(req, res) {
        Movies.findOneAndDelete(req.params.id)
        .then(function(data) {
            return res.status(200).json(data.value)
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        })
    }
}

module.exports = MovieController;