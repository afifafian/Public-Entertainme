const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const moviesUrl = "http://localhost:3001/movies";

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }
    extend type Query {
        movies: [Movie]
        movie(id: ID): Movie
    }
    input MovieInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Int!
        tags: String!
    }
    extend type Mutation {
        addMovie(newMovie: MovieInput!): Movie
        updateMovie(id: ID, updatedMovie: MovieInput!): Movie
        deleteMovie(id: ID): Movie
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const movies = JSON.parse(await redis.get("movies"));
                if (movies) {
                    return movies;
                } else {
                    const {data} = await axios({
                        url: moviesUrl,
                        method: "GET",
                    });
                    redis.set("movies", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        movie: async (parent, args, contex, info) => {
            try {
                const {id} = args;
                const movies = JSON.parse(await redis.get("movies"));
                if (movies) {
                    let filteredMovie = movies.filter((movie) => movie._id === id)
                    return filteredMovie[0];
                } else {
                    const {data} = await axios({
                        url: `${moviesUrl}/${id}`,
                        method: "GET",
                    });
                    return data;
                }
            } catch (error) {
                console.log(error)
                return error;
            }
        },
    },
    Mutation: {
        addMovie: async (parent, args, contex, info) => {
            try {
                const { title, overview, poster_path, popularity, tags} = args.newMovie;
                const newData = { title, overview, poster_path, popularity, tags};
                const { data } = await axios({
                    url: moviesUrl,
                    method: "POST",
                    data: newData,
                });
                const movies = JSON.parse(await redis.get("movies"));
                if (movies) {
                    movies.push(data);
                    redis.set("movies", JSON.stringify(movies));
                }
                return data;
            } catch (error) {
                console.log(error)
                return(error)
            }
        },
        updateMovie: async (parent, args, contex, info) => {
            try {
                const { title, overview, poster_path, popularity, tags } = args.updatedMovie;
                const updateData = { title, overview, poster_path, popularity, tags};
                const {id} = args;
                const { data } = await axios({
                    url: `${moviesUrl}/${id}`,
                    method: "PUT",
                    data: updateData,
                });
                const movies = JSON.parse(await redis.get("movies"));
                if (movies) {
                    let updatedOne = []
                    movies.forEach(movie => {
                        if(movie._id === id) movie = data;
                        updatedOne.push(movie);
                    });
                    redis.set("movies", JSON.stringify(updatedOne));
                }
                return data;
            } catch (error) {
                console.log(error)
                return error;
            }
        },
        deleteMovie: async (parent, args, contex, info) => {
            try {
                const {id} = args;
                const { data } = await axios({
                    url: `${moviesUrl}/${id}`,
                    method: "DELETE",
                });
                const movies = JSON.parse(await redis.get("movies"));
                if (movies) {
                    let notDeleted = movies.filter((movie) => movie._id !== id);
                    redis.set("movies", JSON.stringify(notDeleted));
                }
                return data;
            } catch (error) {
                console.log(error)
                return error;
            }
        }
    }
};

module.exports = {
    typeDefs,
    resolvers,
};