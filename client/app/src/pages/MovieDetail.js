import React from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import Detail from '../components/Detail';
import { useQuery, gql } from "@apollo/client";

export const GET_MOVIE = gql`
    query GetMovie($movieId: ID) {
        movie(id: $movieId) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

const MovieDetail = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { movieId: id }
    });
    if (loading) return <p>Please Wait...</p>
    console.log(data.movie._id)
    
    return (
        <div>
            <Navbar></Navbar>
            <hr></hr>
            <Detail key={data.movie._id} detail={data.movie} />
        </div>
    )
}

export default MovieDetail;