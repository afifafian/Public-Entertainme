import React from "react";
import Navbar from '../components/Navbar';
import Detail from '../components/Detail';
import Loading from '../components/Loading';
import { GET_FAVORITES } from '../config/client';
import { useQuery } from "@apollo/client";

const Favorites = () => {
    const { data: favorites, loading } = useQuery(GET_FAVORITES);

    if (loading) return <Loading/>;

    return (
        <>
            <Navbar/>
            <hr></hr>
            <h1>Favorites Page</h1>
            {favorites.favorites.map((favorite) => (
                <Detail key={favorite._id} detail={favorite}/>
            ))}
        </>
    )
}

export default Favorites;