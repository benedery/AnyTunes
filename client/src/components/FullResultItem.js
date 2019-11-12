import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import './FullResultItem.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { goBackFromItem } from '../store/actions/dataActions'
import Axios from "axios";
import Tilt from 'react-tilt';
import CircularProgress from '@material-ui/core/CircularProgress'
import { FETCHING_STARTED, FETCHING_FINISH } from "../store/actions/types";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const FullResultItem = ({ match, goBack }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.data.isFetching)
    const trackId = match.params.id;
    const [trackData, setTrackData] = useState({});

    // const results = tracks.map((result) => {
    //     if (result.trackId !== Number(trackId)) {
    //         return <ResultItem key={result.trackId} item={result} />
    //     }
    // }
    // );

    useEffect(() => {
        dispatch({ type: FETCHING_STARTED })
        fetch(`https://itunes.apple.com/search?term=${trackId}`)
            .then(res => res.json())
            .then(apiData => {
                setTrackData(apiData.results[0])
                dispatch({ type: FETCHING_FINISH })
            })
            .catch(err => console.log(err));
    }, [trackId, dispatch]);

    const handleDownload = (url) => {
        return Axios.get(url, {
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${trackData.trackName}.m4a`);
                document.body.appendChild(link);
                link.click();
            })
    }
    if (isLoading) return <CircularProgress className="loading-circle" />

    return (
        <React.Fragment>
            <Tilt className="Tilt" options={{ max: 25 }}  >
                <div className="Tilt-inner">
                    <div className="fullitem-container">
                        <IconButton className={classes.button}
                            onClick={() => dispatch(goBackFromItem())}>
                            <ArrowBackIcon /> <span> Go Back</span>
                        </IconButton>
                        <div className="fullitem-details-container">
                            <div className="fullitem-details-info-left">
                                <h1 style={{ fontWeight: "800" }}>{trackData.trackName}</h1>
                                <h3> {trackData.artistName}</h3>
                                <p>Release Date : {trackData.releaseDate}</p>
                                <p>Genre : {trackData.primaryGenreName}</p>
                                <p>Collection : {trackData.collectionName}</p>
                                <p>Country : {trackData.country}</p>
                            </div>
                            <div className="fullitem-details-info-right">
                                <img src={trackData.artworkUrl100} alt="img-poster" />
                                <div className="fullitem-details-artist-right">{trackData.artistName}</div>
                                <div className="fullitem-preview">
                                    <ReactPlayer url={trackData.previewUrl} playing controls={true} width={130} height={50} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Tilt>
            <div className="downloads-container">
                <button onClick={() => handleDownload(trackData.previewUrl)} className="btn-download">
                    Download Ringtone</button>
            </div>
            {/* <div>
                <h3>More Related Tracks</h3>
                <div className="resultsList__container">
                    {results}
                </div>
            </div> */}
        </React.Fragment >
    );
};

export default FullResultItem;

// const mapStateToProps = (state) => {
//     return {
//         tracks: state.data.resultsData
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         goBack: () => dispatch(goBackFromItem())
//     }
// }
// connect(mapStateToProps, mapDispatchToProps)(FullResultItem)