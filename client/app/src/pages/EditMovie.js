import React from "react";
import Navbar from '../components/Navbar';
import FormMovie from '../components/FormMovie';
import { GET_MOVIE } from '../pages/MovieDetail';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const EditMovie = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        }
    })

    if (loading) return <p>Please Wait...</p>;

    return (
        <>
            <Navbar/>
            <FormMovie key={data.movie._id} update={data}/>
        </>
    )
}

export default EditMovie;