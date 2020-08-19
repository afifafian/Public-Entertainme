import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Navbar from '../components/Navbar';
import SeriesCard from '../components/SeriesCard';
import Loading from '../components/Loading';

export const GET_SERIES = gql`
    query {
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

const Series = () => {
    const { loading, error, data } = useQuery(GET_SERIES);
    const history = useHistory();
    const goToAdd = () => {
        history.push("/create/series")
    }
    if (loading) {
        return <Loading/>;
    }
    return (
        <div>
            <Navbar/>
            <button onClick={() => goToAdd()} className="btn btn-primary" style={{marginTop: "30px"}}>Add Series</button>
            <hr></hr>
            {data.series.map((serie) => (
                <SeriesCard key={serie._id} props={serie} />
            ))}
        </div>
    )
}

export default Series;