import problemData from "../data.json";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles, Card, CardContent, CircularProgress, Button, Typography, CardHeader } from "@material-ui/core";
import "../App.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 550,
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

const Problem = (props) => {
  const [showData, setShowData] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  let { id } = useParams();

  useEffect(() => {
    console.log("Problem useEffect fired");
    let indexId = parseInt(id);
    setShowData(problemData[indexId]);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={showData.title} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            <dl>
              <p>
                <dt className="title">Summary:</dt>
                <dd>{showData.summary}</dd>
              </p>
            </dl>

            <p>
              {showData.videoLink && (
                <Button variant="contained">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`${showData.videoLink}`, "_blank");
                    }}
                    to={`${showData.videoLink}`}
                  >
                    Video Link
                  </Link>
                </Button>
              )}
            </p>

            <p>
              {showData.notes && (
                <Button variant="contained">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`${require("../data/" + showData.notes)}`, "_blank");
                    }}
                    to={`${require("../data/" + showData.notes)}`}
                  >
                    Notes
                  </Link>
                </Button>
              )}
            </p>

            <p>
              <Button variant="contained">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`${showData.link}`, "_blank");
                  }}
                  to={`${showData.link}`}
                >
                  Leetcode Problem Link
                </Link>
              </Button>
            </p>

            <p>
              <Button variant="contained">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`${showData.mySolution}`, "_blank");
                  }}
                  to={`${showData.mySolution}`}
                >
                  My Solution
                </Link>
              </Button>
            </p>

            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              Back to Home
            </Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Problem;
