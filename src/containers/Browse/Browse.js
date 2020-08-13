import requests from "../../requests.js";
import React, { useContext } from "react";
import Row from "../../components/Row/Row";
import Banner from "../../components/Banner/Banner";
import Nav from "../../components/Nav/Nav";
import { AvatarContext, UsernameContext } from "../../store/store.js";

const Browse = () => {
  const { avatar } = useContext(AvatarContext);
  const { username } = useContext(UsernameContext);

  console.log(avatar, username);

  return (
    <div>
      <Nav
        avatar={avatar} //get state from store
        username={username} //get state from store
      />
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
};

export default Browse;
