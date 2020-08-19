import React from "react";
import { useQuery, gql } from "@apollo/client";
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import SeriesCard from '../components/SeriesCard';
import Loading from '../components/Loading';

const GET_ENTERTAINME = gql`
    query {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
        series {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

const Home = () => {
    const { loading, error, data } = useQuery(GET_ENTERTAINME);
    if (loading) {
        return <Loading/>
    }
    return (
        <>
            <Navbar></Navbar>
            <h1 style={{marginTop: "30px"}}>Welcome to Cinema-21</h1>
            <hr/>
            <h2>Movies:</h2><br></br>
            {data.movies.map((movie) => (
                <MovieCard key={movie._id} props={movie} />
            ))}
            <h2 style={{marginTop: "20px"}}>Series:</h2><br></br>
            {data.series.map((serie) => (
                <SeriesCard key={serie._id} props={serie} />
            ))}
        </>
    )
}

export default Home;