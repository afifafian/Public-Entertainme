import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { GET_MOVIES } from '../pages/Movies';
import { GET_SERIES } from '../pages/Series';
import swal from "sweetalert";
import './Card.css';

const DELETE_MOVIE = gql`
    mutation DeleteMovie($movieId: ID) {
        deleteMovie(id: $movieId) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`
const DELETE_SERIES = gql`
    mutation DeleteSeries($seriesId: ID) {
        deleteSeries(id: $seriesId) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

const Detail = ({detail}) => {
    const {_id, title, overview, poster_path, popularity, tags} = detail;
    const location = useLocation();
    const { state } = location;
    const history = useHistory();

    const toEdit = () => {
        if (state === "movie") {
            history.push({
                pathname: `/movie/edit/${_id}`,
                state: "edit"
            })
        } else {
            history.push({
                pathname: `/series/edit/${_id}`,
                state: "series"
            })
        }
    }

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIES,
        }],
        onCompleted: () => {
            history.push("/movies")
        }
    })

    const [deleteSeries] = useMutation(DELETE_SERIES, {
        refetchQueries: [{
            query: GET_SERIES,
        }],
        onCompleted: () => {
            history.push("/series")
        }
    })

    const toDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this movie!",
            icon: "warning",
            buttons: true,
            dangerMode: true,

        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Successfully Deleted Movie!", {
                    icon: "success",
                });
                if (state === "movie") {
                    deleteMovie({
                        variables: {
                            movieId: _id
                        }
                    })
                } else {
                    deleteSeries({
                        variables: {
                            seriesId: _id
                        }
                    })
                }
            } else {
                swal("Delete Movie Canceled!");
            }  
        });
    }

    return (
        <div className="card container" style={{width: "30rem"}}>
            <img src={poster_path} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{overview}</p>
                <p className="card-text">Rate: {popularity}/100</p>
                <p>{tags.join(",")}</p>
                {state === "favorites" ? null : <button className="btn btn-info" onClick={() => toEdit()}>Edit</button>} &nbsp;
                {state === "favorites" ? null : <button onClick={toDelete} className="btn btn-danger">Delete</button>}
            </div>
        </div>
    )
}

export default Detail;