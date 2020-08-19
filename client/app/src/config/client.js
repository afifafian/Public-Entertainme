import {ApolloClient, InMemoryCache, gql, makeVar} from "@apollo/client";

export const favoritesItems = makeVar([]);

export const GET_FAVORITES = gql`
    query {
        favorites {
            _id 
            title      
            overview      
            poster_path
            popularity
            tags      
        }
    }
`;

const client = new ApolloClient({
    uri: "http://localhost:2010/",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    favorites: {
                        read: () => {
                            return favoritesItems();
                        }
                    }
                }
            }
        }
    }),
});

export default client;