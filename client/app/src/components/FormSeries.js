import React, {useState} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {GET_SERIES} from '../pages/Series';

const ADD_SERIES = gql`
  mutation AddSeries($addTvSeries: SeriesInput!) {
    addSeries(newSeries: $addTvSeries) {
      _id 
      title      
      overview      
      poster_path
      popularity
      tags
    }
  }
`;

const UPDATE_SERIES = gql`
  mutation updateSeries($updatedSeriesId: ID, $inputSeries: SeriesInput!) {
    updateSeries(id: $updatedSeriesId, updatedSeries: $inputSeries) {
      _id 
      title      
      overview      
      poster_path
      popularity
      tags
    }
  }
`;

const FormSeries = ({update}) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();  
  const { state } = location;
  
  const [alert, setAlert] = useState(false);

  const [inputSeries, setInputSeries] = useState(
    {
      title: state ? update.serie.title : "",
      overview: state ? update.serie.overview : "",
      poster_path: state ? update.serie.poster_path : "",
      popularity: state ? update.serie.popularity : "",
      tags: state ? update.serie.tags.join(",") : "",
    }
  );
  
  const [addSeries] = useMutation(ADD_SERIES, {
    refetchQueries: [{
      query: GET_SERIES,
    }],
    onCompleted: () => {
      history.push("/series")
    }
  });

  const [updateSeries] = useMutation(UPDATE_SERIES, {
    refetchQueries: [{
      query: GET_SERIES,
    }],
    onCompleted: () => {
      history.push("/series")
    }
  });

  const handleChange = (e) => {
    let {name, value} = e.target;
    console.log(e.target.value, "ini handle change")
    if (name === "popularity") {
      value = +value;
    }
    const newInputSeries = { ...inputSeries, [name]: value };
    setInputSeries(newInputSeries);
  };

  const submitSeriesMutations = (e) => {
    e.preventDefault();
    if (state) {
      if (inputSeries.title === "" || inputSeries.overview === "" || inputSeries.poster_path === "" ||
      inputSeries.tags === "") {
        setAlert(true)
      } else {
        updateSeries({
          variables: {
            updatedSeriesId: id,
            inputSeries: inputSeries,
          }
        });
      }
    } else if (state === undefined) {
      if (inputSeries.title === "" || inputSeries.overview === "" || inputSeries.poster_path === "" ||
      inputSeries.tags === "") {
        setAlert(true)
      } else {
        addSeries({
          variables: {
            addTvSeries: inputSeries,
          }  
        });
      }
    }
  };

  return (
    <>
      <div className="container" style={{marginTop: "20px"}}>
        <h1 style={{marginBottom: "40px"}} >Form Series</h1>
        {alert ? <p className="alert alert-danger">Please fill all the fields</p> : null}
        <form onSubmit={(e) => submitSeriesMutations(e)}>
          <div className="form-group">
            <p>Title</p>
            <input
              type="text"
              className="form-control"
              name="title"
              contentEditable="true"
              value={inputSeries.title}
              onChange={handleChange}
            /><br/>
            <p>Overview</p>
            <input
              type="text"
              className="form-control"
              name="overview"
              contentEditable="true"
              value={inputSeries.overview}
              onChange={handleChange}
            /><br/>
            <p>Poster</p>
            <input
              type="text"
              className="form-control"
              name="poster_path"
              contentEditable="true"
              value={inputSeries.poster_path}
              onChange={handleChange}
            /><br/>
            <p>Popularity</p>
            <input
              type="number"
              className="form-control"
              name="popularity"
              contentEditable="true"
              value={inputSeries.popularity}
              onChange={handleChange}
            /><br/>
            <p>Tags</p>
            <input
              type="text"
              className="form-control"
              name="tags"
              contentEditable="true"
              value={inputSeries.tags}
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

export default FormSeries;