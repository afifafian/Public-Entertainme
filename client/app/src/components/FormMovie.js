import React, {useState} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {GET_MOVIES} from '../pages/Movies';

const ADD_MOVIE = gql`
  mutation AddMovie($addMovies: MovieInput!) {
    addMovie(newMovie: $addMovies) {
      _id 
      title      
      overview      
      poster_path
      popularity
      tags
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation updateMovie($updatedMovieId: ID, $inputMovies: MovieInput!) {
    updateMovie(id: $updatedMovieId, updatedMovie: $inputMovies) {
      _id 
      title      
      overview      
      poster_path
      popularity
      tags
    }
  }
`;

const FormMovie = ({update}) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const { state } = location;

  const [alert, setAlert] = useState(false);
  const [inputMovie, setInputMovie] = useState(
    {
      title: state ? update.movie.title : "",
      overview: state ? update.movie.overview : "",
      poster_path: state ? update.movie.poster_path : "",
      popularity: state ? update.movie.popularity : "",
      tags: state ? update.movie.tags.join(",") : "",
    }
  );
  
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES,
    }],
    onCompleted: () => {
      history.push("/movies");
    }
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES,
    }],
    onCompleted: () => {
      history.push("/movies");
    }
  });

  const handleChange = (e) => {
    let {name, value} = e.target;
    if (name === "popularity") {
      value = +value;
    }
    const newInputMovie = { ...inputMovie, [name]: value };
    setInputMovie(newInputMovie);
  };

  const submitAddEdit = (e) => {
    e.preventDefault();
    if (state) {
      if (inputMovie.title === "" || inputMovie.overview === "" || inputMovie.poster_path === "" ||
      inputMovie.tags === "") {
        setAlert(true)
      } else {
        updateMovie({
          variables: {
            updatedMovieId: id,
            inputMovies: inputMovie,
          }
        });
      }
    } else if (state === undefined) {
      if (inputMovie.title === "" || inputMovie.overview === "" || inputMovie.poster_path === "" ||
      inputMovie.tags === "") {
        setAlert(true)
      } else {
        addMovie({
          variables: {
            addMovies: inputMovie,
          }  
        });
      }
    }
  };

  return (
    <>
      <div className="container" style={{marginTop: "20px"}}>
        <h1 style={{marginBottom:"40px"}} >Form Movie</h1>
        {alert ? <p className="alert alert-danger">Please fill all the fields!</p> : null}
        <form onSubmit={(e) => submitAddEdit(e)}>
          <div className="form-group">
            <p>Title</p>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="e.g. Titanic"
              value={inputMovie.title}
              onChange={handleChange}
            /><br/>
            <p>Overview</p>
            <input
              type="text"
              className="form-control"
              name="overview"
              placeholder="A Short Overview of the Movie"
              value={inputMovie.overview}
              onChange={handleChange}
            /><br/>
            <p>Movie Poster</p>
            <input
              type="text"
              className="form-control"
              name="poster_path"
              placeholder="Image url format"
              value={inputMovie.poster_path}
              onChange={handleChange}
            /><br/>
            <p>Popularity</p>
            <input
              type="number"
              min="0"
              max="100"
              className="form-control"
              name="popularity"
              placeholder="Should be in range of 0-100"
              value={inputMovie.popularity}
              onChange={handleChange}
            /><br/>
            <p>Tags</p>
            <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="e.g. action, comedy, drama, etc"
              value={inputMovie.tags}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormMovie;