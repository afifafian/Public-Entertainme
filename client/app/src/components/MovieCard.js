import React from "react";
import { Link, useHistory } from "react-router-dom";
import { favoritesItems } from '../config/client';
import swal from "sweetalert";
import './Card.css';

const MovieCard = ({props}) => {
    const {_id, title, poster_path, popularity} = props
    const history = useHistory();

    const addToFav = () => {
        const currentFavorites = favoritesItems();
        const checkFavorites = currentFavorites.find(favorite => favorite._id === _id)
        if (checkFavorites) {
            swal("Warning!", "Already added to Favorite!", "warning");
        } else {
            favoritesItems([...currentFavorites, props])
            history.push({
                pathname: "/favorites",
                state: "favorites"
            })
        }
    }

    return (
        <div className="card container" style={{width: "22rem"}}>
            <img src={poster_path} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={{ pathname: `/movie/${_id}`, state: "movie"}} >{title}</Link>
                </h5>
                <p className="card-text">Rate: {popularity}</p>
                <button onClick={() => addToFav()} className="btn btn-success">
                    Add to Favorites
                </button>
            </div>
        </div>
    )
}

export default MovieCard;