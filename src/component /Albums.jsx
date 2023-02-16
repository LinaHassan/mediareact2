import React, { useContext, useEffect, useState } from "react";
import UserContext from "../useContext/UserContext";
import classes from "./Albums.module.css";
import { Link } from "react-router-dom";

const Albums = () => {
  const {value} = useContext(UserContext);
  const userID = value ? value.id : null;
  const [albums, setAlbums] = useState([]);

  
  useEffect(() => {
  
    const getAlbum = async () => {
      const response = await fetch(
       `https://jsonplaceholder.typicode.com/albums?userId=${userID}`
      );
      const data = await response.json();
      setAlbums(data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
          <Link to={`/Photos/${album.id}`}>
          
              {album.title}
          </Link>
            </div>
        ))}
      </div>
    </>
  );
};
export default Albums;
