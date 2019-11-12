import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";
import { Link } from "react-router-dom";
import "./ResultItem.css"

const ResultItem = ({
    item
}) => {
    return (
        <Card id="item-card" className="resultItem-card" key={item.trackId}>
            <CardActionArea>
                <Link to={`itunes/${item.trackId}`} style={{ textDecoration: "none" }}>
                    {item.artworkUrl100 === "N/A" ? null : (
                        <CardMedia title={item.kind}>
                            <img id="item-image" src={item.artworkUrl100} alt="movie-poster" />
                        </CardMedia>
                    )}
                </Link>
                <CardContent>
                    <p className="resultitem-artist-text">{item.artistName}</p>
                    <p className="resultitem-track-text">{item.trackName}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ResultItem;
