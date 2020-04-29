import React, { useState, useEffect } from "react";
import axios from "axios";
const LIST_MOVIES_URI = `https://yts.mx/api/v2/list_movies.json`;

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  movielist__css: {
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
    width: "95%"
  },
  root: {
    maxWidth: 345,
    float: "left",
    marginRight: "24px",
    marginBottom: "25px"
  },
  media: {
    height: 140
  }
});

const MovieList = () => {
  //console.log(props.movieItems);
  const classes = useStyles();

  const [loader, setloader] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const fetchData = () => {
    setloader(true);
    axios.get(`${LIST_MOVIES_URI}`).then(res => {
      setMovieList(res.data.data.movies);
      setloader(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3>Movie List Items</h3>
      {loader && <h4>loading....</h4>}
      <div className={classes.movielist__css}>
        {movieList &&
          movieList.map(movie => {
            return (
              <Card className={classes.root} key={movie.id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={movie.medium_cover_image}
                    title=""
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {movie.title_english}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default MovieList;
