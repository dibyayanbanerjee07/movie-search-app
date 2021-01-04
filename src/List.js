import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Detail from "./Detail";
import Grid from '@material-ui/core/Grid';

const List = () => {
  const [stext, setstext] = useState("batman");
  const [snumber, setsnumber] = useState("");
  const [result, setresult] = useState([]);
  const [detailbool, setdetailbool] = useState(false);
  const [imval, setimval] = useState();

  const showChange = (event) => {
    setstext(event.target.value);
  };
  const showChange2 = (event) => {
    setsnumber(event.target.number);
  };
  const show = () => {
    axios
      .get(`https://www.omdbapi.com/?i=tt3896198&apikey=4eb65943&s=${stext}`)
      .then((res) => {
        setresult(res.data.Search.map((p) => p));
      });
  };
  function showDetail(i) {
    setdetailbool(true);
    setimval(i);
  }
  function funsetdetailbool() {
    setdetailbool(false);
  }

  return (
    <>
      <center>
      <Grid container justify="center" alignItems="center" className=" navbar-dark bg-dark">
        <Grid item xs={6} spacing={2} style={{marginBottom: 12}}>
            <br />
            <input
              type="text"
              value={stext}
              onChange={showChange}
              placeholder="Search Movies Title"
              style={{
                height: "57px",
                width: "300px",
                borderRadius: "5px",
                paddingLeft: "30px",
                color: "white",
                background: "#212121",
                border: "2px",
              }}
            />
            <Fab
              color="primary"
              aria-label="add"
              style={{
                background: "blue",
                borderRadius: 5,
                marginLeft: 7,
                marginTop: -3
              }}
            >
              <SearchIcon onClick={show} />
            </Fab>
          </Grid> 
          <Grid item xs={6} spacing={2} style={{marginTop: 12}}>
              <input
                type="text"
                number={stext}
                onChange={showChange2}
                placeholder="Search by release year"
                style={{
                  height: "57px",
                  width: "300px",
                  borderRadius: "5px",
                  paddingLeft: "30px",
                  color: "white",
                  background: "#212121",
                  border: "2px",
                }}
              />
              <Fab
                color="primary"
                aria-label="add"
                style={{
                  background: "blue",
                  borderRadius: 5,
                  marginLeft: 7,
                  marginTop: -3
                }}
              >
                <SearchIcon onClick={show} />
              </Fab>
              <br />
          </Grid>
       </Grid> 
        <br />
         
        {result.map((p) => (
          <div key={p.imdbID} onClick={() => showDetail(p.imdbID)}>
            <Card className="movieCard">
              <CardActionArea>
                <img className="moviePoster" src={p.Poster} alt="poster" />
                <div style={{ paddingTop: "5px" }}>
                  <h6>{p.Title}</h6>
                </div>
              </CardActionArea>
            </Card>
          </div>
        ))}
        {detailbool ? (
          <Detail imval={imval} funsetdetailbool={funsetdetailbool} />
        ) : null}
      </center>
    </>
  );
};
export default List;
