import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import problemData from "../data.json";
import {
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
});

const ProblemList = () => {
  const classes = useStyles();
  const regex = /(<([^>]+)>)/gi;
  const [loading, setLoading] = useState(true);
  let card = null;

  useEffect(() => {
    console.log("search useEffect fired");
    const data = problemData;
    setLoading(false);
    console.log(data);
  }, []);

  const buildCard = (Problem) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={Problem.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <Link to={`/problem/${Problem.id}`}>
              {/* <CardMedia
                className={classes.media}
                component="img"
                image={show.image && show.image.original ? show.image.original : noImage}
                title="show image"
              /> */}

              <CardContent>
                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h3">
                  {Problem.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {Problem.summary ? Problem.summary.replace(regex, "").substring(0, 139) + "..." : "No Summary"}
                  <span>More Info</span>
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  card =
    problemData &&
    problemData.map((Problem) => {
      return buildCard(Problem);
    });

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <br />
          <br />
          <Grid container className={classes.grid} spacing={5}>
            {card}
          </Grid>
          <br />
          <br />
        </Container>
      </div>
    );
  }
};

export default ProblemList;
