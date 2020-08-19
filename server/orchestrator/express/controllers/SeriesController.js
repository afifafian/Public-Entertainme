const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class SeriesController {
    static async getSeries(req, res) {
        try {
            const series = JSON.parse(await redis.get("series"));
            if (series) {
                res.status(200).json(series);
            } else {
                const { data } = await axios({
                    url: "http://localhost:3002/tv",
                    method: "GET",
                });
                res.status(200).json(data);
                redis.set("series", JSON.stringify(data));
            }
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }  
    }

    static async getOneSeries(req, res) {
        try {
            const { id } = req.params;
            const series = JSON.parse(await redis.get("serie"));
            if (series && series._id === id) {
                res.status(200).json(series);
            } else {
                const { data } = await axios({
                    url: `http://localhost:3002/tv/${id}`,
                    method: "GET",
                });
                res.status(200).json(data);
                redis.set("serie", JSON.stringify(data));
            }
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async addSeries(req, res) {
        try {
            const { data } = await axios({
                url: "http://localhost:3002/tv",
                method: "POST",
                data: req.body,
            });
            res.status(201).json(data);
            const series = JSON.parse(await redis.get("series"));
            if (series) {
                series.push(data);
                redis.set("series", JSON.stringify(series));
            }
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async updateSeries(req, res) {
        try {
            const { id } = req.params;
            const { data } = await axios({
                url: `http://localhost:3002/tv/${id}`,
                method: "PUT",
                data: req.body,
            });
            res.status(200).json(data);
            const series = JSON.parse(await redis.get("series"));
            if (series) {
                let newSeries = [];
                series.forEach((e) => {
                    if (e._id === id) e = data;
                    newseries.push(e);
                });
                redis.set("series", JSON.stringify(newSeries));
            }
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async deleteSeries(req, res) {
        try {
            const { id } = req.params;
            const { data } = await axios({
                url: `http://localhost:3002/tv/${id}`,
                method: "DELETE",
            });
            res.status(200).json(data);
            const series = JSON.parse(await redis.get("series"));
            if (series) {
                let notDeleted = series.filter((item) => item._id !== id);
                redis.set("series", JSON.stringify(notDeleted));
            }
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = SeriesController;