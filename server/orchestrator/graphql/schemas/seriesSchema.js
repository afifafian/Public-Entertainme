const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const seriesUrl = "http://localhost:2009/tv";

const typeDefs = gql`
    type Series {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }
    extend type Query {
        series: [Series]
        serie(id: ID): Series
    }
    input SeriesInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Int!
        tags: String!
    }
    extend type Mutation {
        addSeries(newSeries: SeriesInput!): Series
        updateSeries(id: ID, updatedSeries: SeriesInput!): Series
        deleteSeries(id: ID): Series
    }
`;

const resolvers = {
    Query: {
        series: async () => {
            try {
                const series = JSON.parse(await redis.get("series"));
                if (series) {
                    return series;
                } else {
                    const {data} = await axios({
                        url: seriesUrl,
                        method: "GET",
                    });
                    redis.set("series", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        serie: async (parent, args, contex, info) => {
            try {
                const {id} = args;
                const series = JSON.parse(await redis.get("series"));
                if (series) {
                    let oneSeries =  series.filter((oneSeries) => oneSeries._id === id);
                    return oneSeries[0];
                } else {
                    const {data} = await axios({
                        url: `${seriesUrl}/${id}`,
                        method: "GET",
                    });
                    return data;
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Mutation: {
        addSeries: async (parent, args, contex, info) => {
            try {
                const { title, overview, poster_path, popularity, tags} = args.newSeries;
                const newData = { title, overview, poster_path, popularity, tags};
                const { data } = await axios({
                    url: seriesUrl,
                    method: "POST",
                    data: newData,
                });
                const series = JSON.parse(await redis.get("series"));
                if (series) {
                    series.push(data);
                    redis.set("series", JSON.stringify(series));
                }
                return data;
            } catch (error) {
                console.log(error);
                return(error);
            }
        },
        updateSeries: async (parent, args, contex, info) => {
            try {
                const { title, overview, poster_path, popularity, tags } = args.updatedSeries;
                const updateData = { title, overview, poster_path, popularity, tags};
                const {id} = args;
                const { data } = await axios({
                    url: `${seriesUrl}/${id}`,
                    method: "PUT",
                    data: updateData,
                });
                const series = JSON.parse(await redis.get("series"));
                if (series) {
                    let updatedOne = [];
                    series.forEach(serie => {
                        if(serie._id === id) serie = data;
                        updatedOne.push(serie);
                    });
                    redis.set("series", JSON.stringify(updatedOne));
                }
                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        deleteSeries: async (parent, args, contex, info) => {
            try {
                const {id} = args;
                const { data } = await axios({
                    url: `${seriesUrl}/${id}`,
                    method: "DELETE",
                });
                const series = JSON.parse(await redis.get("series"));
                if (series) {
                    let notDeleted = series.filter((serie) => serie._id !== id);
                    redis.set("series", JSON.stringify(notDeleted));
                }
                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
};

module.exports = {
    typeDefs,
    resolvers,
};