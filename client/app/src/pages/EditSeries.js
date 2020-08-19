import React from "react";
import Navbar from '../components/Navbar';
import FormSeries from '../components/FormSeries';
import { GET_ONESERIES } from '../pages/SeriesDetail';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const EditSeries = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_ONESERIES, {
        variables: {
            seriesId: id
        }
    })

    if (loading) return <p>Please Wait...</p>;

    return (
        <>
            <Navbar/>
            <FormSeries key={data.serie._id} update={data} />
        </>
    )
}

export default EditSeries;