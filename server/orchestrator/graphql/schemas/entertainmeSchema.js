const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const moviesUrl = "http://localhost:2008/movies";
const seriesUrl = "http://localhost:2009/tv";

const typeDefs = gql`
    type Movies {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }
    type TvSeries {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }
    type entertainMe {
        movies: [Movies]
        series: [TvSeries]
    }
    extend type Query {
        movieSeries: entertainMe
    }
`;

const resolvers = {
    Query: {
        movieSeries: async () => {
            try {
                const movieTvSeries = {};
                const movies = JSON.parse(await redis.get("movies"));
                if (movies) {
                    movieTvSeries.movies = movies;
                }
                const series = JSON.parse(await redis.get("series"));
                if (series) {
                    movieTvSeries.series = series
                }
                return movieTvSeries;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};