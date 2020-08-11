import React from "react";
import classes from "./App.module.css";
import Row from "./components/Row/Row";
import Banner from "./components/Banner/Banner";
import Nav from "./components/Nav/Nav";
import requests from "./requests.js";

function App() {
  const myRequests = requests;
  return (
    <div className={classes.app}>
      <Nav />
      <Banner />
      <br />
      <br />
      <Row
        title={requests[0].titleOriginals}
        fetchUrl={requests[0].urlOriginals}
        isLargeRow={true}
      />

      {requests.map((movie) => (
        <Row
          title={movie.title}
          fetchUrl={movie.url}
          key={movie.title + Math.random()}
        />
      ))}
    </div>
  );
}

export default App;
