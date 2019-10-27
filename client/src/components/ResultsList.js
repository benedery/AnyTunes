import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchingSearchTerm } from '../store/actions/dataActions'
import ResultItem from "./ResultItem";
import './ResultsList.css'

const ResultsList = ({
    resultsData,
    searchTerm,
    fetchingData
}) => {
    useEffect(() => {
        if (searchTerm) {
            fetchingData(searchTerm)
        }
    }, [fetchingData, searchTerm])

    const results = resultsData.map((result) => (
        <ResultItem key={result.trackId} item={result} />
    ));

    return (
        <React.Fragment>
            <div className="resultsList__container">
                {results}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        resultsData: state.data.resultsData,
        searchTerm: state.data.searchTerm
    };
};

const mapDispatchToProps = (dispatch, searchTerm) => {
    return {
        fetchingData: (searchTerm) => dispatch(fetchingSearchTerm(searchTerm)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsList);
