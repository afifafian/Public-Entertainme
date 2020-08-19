import React from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import Detail from '../components/Detail';
import { useQuery, gql } from "@apollo/client";

export const GET_ONESERIES = gql`
    query GetOneSeries($seriesId: ID) {
        serie(id: $seriesId) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

const SeriesDetail = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_ONESERIES, {
        variables: { seriesId: id }
    });
    if (loading) return <p>Please Wait...</p>
    return (
        <div>
            <Navbar></Navbar>
            <hr></hr>
            <Detail key={data.serie._id} detail={data.serie} />
        </div>
    )
}

export default SeriesDetail;