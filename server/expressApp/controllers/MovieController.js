const Movies = require('../models/Movies');

class MovieController {
    static getMovies (req, res) { 
        Movies.findAll()
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static getMovie (req, res) {
        Movies.findOne(req.params.id)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static addMovie (req, res) {
        const newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: req.body.tags.split(",")
        }
        Movies.insertOne(newMovie)
        .then(function(data) {
            res.status(201).json(data.ops[0])
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static updateMovie (req, res) {
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
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static deleteMovie (req, res) {
        Movies.findOneAndDelete(req.params.id)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
}

module.exports = MovieController;