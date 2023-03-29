import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import problemData from "../data.json";
import filterData from "../filterData.json";
import SearchProblems from "./SearchProblems";
import FilterProblems from "./FilterProblems";
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
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerms, setfilterTerms] = useState([]);
  let card = null;

  useEffect(() => {
    console.log("Problem list useEffect fired");
    setData(problemData);
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("search useEffect fired");
    let dataList = [];

    for (const problem of problemData) {
      if (problem["title"].includes(searchTerm)) {
        dataList.push(problem);
      }
    }
    setData(dataList);
    setLoading(false);
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    console.log("filter useEffect fired");
    let dataList = [];
    for (const filterTerm of filterTerms) {
      console.log(filterData[filterTerm]);
      for (const id of filterData[filterTerm]) {
        dataList.push(problemData[id]);
      }
    }
    setfilteredData(dataList);
    setData(dataList);
    setLoading(false);
  }, [filterTerms]);

  const filterProblems = async (value) => {
    setfilterTerms(value);
  };

  const buildCard = (Problem) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={Problem.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <Link to={`/dsawebsite/problem/${Problem.id}`}>
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

  if (filterTerms.length !== 0) {
    if (searchTerm) {
      card =
        data &&
        data.map((Problem) => {
          return buildCard(Problem);
        });
    } else {
      card =
        filteredData &&
        filteredData.map((Problem) => {
          return buildCard(Problem);
        });
    }
  } else {
    if (searchTerm) {
      card =
        data &&
        data.map((Problem) => {
          return buildCard(Problem);
        });
    } else {
      card =
        problemData &&
        problemData.map((Problem) => {
          return buildCard(Problem);
        });
    }
  }

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
          <SearchProblems searchValue={searchValue} />
          <br />
          <FilterProblems filterterms={filterProblems} />
          <br />
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
