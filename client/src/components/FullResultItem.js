import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import './FullResultItem.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import { goBackFromItem } from '../store/actions/dataActions'
import ResultItem from "./ResultItem";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const FullResultItem = ({ match, goBack, tracks }) => {
    const classes = useStyles();
    const trackId = match.params.id;
    const [trackData, setTrackData] = useState({});
    const results = tracks.map((result) => {
        if (result.trackId !== Number(trackId)) {
            return <ResultItem key={result.trackId} item={result} />
        }
    }
    );

    useEffect(() => {
        fetch(`https://itunes.apple.com/search?term=${trackId}`)
            .then(res => res.json())
            .then(apiData => {
                setTrackData(apiData.results[0])
            })
            .catch(err => console.log(err));
    }, [trackId]);

    return (
        <React.Fragment>
            <div className="fullitem-container">
                <IconButton className={classes.button} onClick={goBack}>
                    <ArrowBackIcon /> <span> Go Back</span>
                </IconButton>
                <div className="fullitem-details-container">
                    <div className="fullitem-details-info-left">
                        <h1>{trackData.trackName}</h1>
                        <h3> {trackData.artistName}</h3>
                        <p>Release Date : {trackData.releaseDate}</p>
                        <p>Genre : {trackData.primaryGenreName}</p>
                        <p>Collection : {trackData.collectionName}</p>
                        <p>Country : {trackData.country}</p>
                    </div>
                    <div className="fullitem-details-info-right">
                        <img src={trackData.artworkUrl100} alt="img-poster" />
                    </div>
                </div>
                <div className="fullitem-preview">
                    <ReactPlayer url={trackData.previewUrl} playing controls={true} width={350} height={100} />
                </div>
            </div>
            {/* <div>
                <h3>More Related Tracks</h3>
                <div className="resultsList__container">
                    {results}
                </div>
            </div> */}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        tracks: state.data.resultsData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => dispatch(goBackFromItem())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullResultItem);
