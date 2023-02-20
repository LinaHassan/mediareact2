import React, { useContext, useEffect, useState } from "react";
import UserContext from "../useContext/UserContext";
import classes from "./Albums.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Albums = () => {
  const { value } = useContext(UserContext);
  const userID = value ? value.id : null;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const response = await axios.get(`/albums?userId=${userID}`);
        const data = await response.data;
        setAlbums(data);
      } catch (error) {
        throw new error(`HTTP error! ${error}`);
      }
    };
    getAlbum();
  }, [albums]);
  return (
    <>
      <div className={classes.continer}>
        <h1>List of the Album</h1>

        {albums.map((album) => (
          <div className={classes.albums} key={album.id}>
            <Link to={`/Photos/${album.id}`}>{album.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default Albums;
