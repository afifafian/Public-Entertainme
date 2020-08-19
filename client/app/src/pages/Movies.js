import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

export const GET_MOVIES = gql`
    query {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

const Movies = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    const history = useHistory();
    const goToAdd = () => {
        history.push("/create/movie")
    }
    if (loading) {
        return <Loading/>;
    }
    return (
        <div>
            <Navbar/>
            <button onClick={() => goToAdd()} className="btn btn-primary" style={{marginTop: "30px"}}>Add Movie</button>
            <hr></hr>
            {data.movies.map((movie) => (
                <MovieCard key={movie._id} props={movie} />
            ))}
        </div>
    )
}

export default Movies;