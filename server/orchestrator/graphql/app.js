const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const MovieSchema = require('./schemas/movieSchema');
const SeriesSchema = require('./schemas/seriesSchema');
const EntertainMeSchema = require('./schemas/entertainmeSchema');

const typeDefs = `
    type Query
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        MovieSchema.typeDefs,
        SeriesSchema.typeDefs,
        EntertainMeSchema.typeDefs,
    ],
    resolvers: [
        MovieSchema.resolvers,
        SeriesSchema.resolvers,
        EntertainMeSchema.resolvers,
    ]
});

const server = new ApolloServer({ schema });

server.listen(2010).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`); 
});