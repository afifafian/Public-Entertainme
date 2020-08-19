const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class MoviesController {
  static async getMovies(req, res) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        res.status(200).json(movies);
      } else {
        const { data } = await axios({
          url: "http://localhost:3001/movies",
          method: "GET",
        });
        res.status(200).json(data);
        redis.set("movies", JSON.stringify(data));
      }
    } catch (err) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  static async getMovie(req, res) {
    try {
      const { id } = req.params;
      const movie = JSON.parse(await redis.get("movie"));
      if (movie && movie._id === id) {
        res.status(200).json(movie);
      } else {
        const { data } = await axios({
          url: `http://localhost:3001/movies/${id}`,
          method: "GET",
        });
        res.status(200).json(data);
        redis.set("movie", JSON.stringify(data));
      }
    } catch (err) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  static async addMovie(req, res) {
    try {
      const { data } = await axios({
        url: "http://localhost:3001/movies",
        method: "POST",
        data: req.body,
      });
      res.status(201).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        console.log(data)
        movies.push(data);
        redis.set("movies", JSON.stringify(movies));
      }
    } catch (err) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  static async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `http://localhost:3001/movies/${id}`,
        method: "PUT",
        data: req.body,
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        let newMovies = [];
        movies.forEach((movie) => {
          if (movie._id === id) movie = data;
          newMovies.push(movie);
        });
        redis.set("movies", JSON.stringify(newMovies));
      }
    } catch (err) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  static async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `http://localhost:3001/movies/${id}`,
        method: "DELETE",
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        let notDeleted = movies.filter((movie) => movie._id !== id);
        redis.set("movies", JSON.stringify(notDeleted));
      }
    } catch (err) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }
}

module.exports = MoviesController;