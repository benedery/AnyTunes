import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import "./ResultItem.css"

const ResultItem = ({
    item
}) => {
    return (
        <Card className="resultItem-card" key={item.trackId}>
            <CardActionArea>
                <Link to={`itunes/${item.trackId}`} style={{ textDecoration: "none" }}>
                    {item.artworkUrl100 === "N/A" ? null : (
                        <CardMedia title={item.kind}>
                            <img id="item-image" src={item.artworkUrl100} alt="movie-poster" />
                        </CardMedia>
                    )}
                </Link>
                <CardContent>
                    <Typography color="textSecondary">{item.artistName}</Typography>
                    <Typography>{item.trackName}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ResultItem;
