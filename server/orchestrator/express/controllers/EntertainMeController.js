const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");
const urlMovies = "http://localhost:3001/movies";
const urlSeries = "http://localhost:3002/tv";

class EntertainMeController {
    static async findAll(req, res) {
        try {
            const moviesSeries = {};
            const movies = JSON.parse(await redis.get("movies"));
            if (!movies || movies.length === 0) {
                const { data } = await axios({
                    url: urlMovies,
                    method: "GET",
                });
                moviesSeries.movies = data;
                redis.set("movies", JSON.stringify(data));
            } else {
                moviesSeries.movies = movies;
            }
            const series = JSON.parse(await redis.get("series"));
            if (!series || series.length === 0) {
                const { data } = await axios({
                    url: urlSeries,
                    method: "GET",
                });
                moviesSeries.series = data;
                redis.set("series", JSON.stringify(data));
            } else {
                moviesSeries.series = series;
            }
            res.status(200).json(moviesSeries);
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = EntertainMeController;