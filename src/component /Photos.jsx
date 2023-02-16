import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./Photos.module.css";

const Photos = () => {
  const { id } = useParams();
  const [allphotos, setAllPhotos] = useState([]);
  useEffect(() => {
    const getPhotos = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
      );
      const data = await response.json();
      setAllPhotos(data);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    };
    getPhotos();
  }, [id]);
  return (
    <main className={classes.main_section}>
      {allphotos.map((photo) => (
        <div className={classes.pic_section} key={photo.id}>
          <img src={photo.url} alt="Photos"></img>
          <p> {photo.title}</p>
        </div>
      ))}
    </main>
  );
};

export default Photos;
