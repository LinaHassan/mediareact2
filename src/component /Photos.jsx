import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./Photos.module.css";
import axios from "axios";
const Photos = () => {
  const { id } = useParams();
  const [allphotos, setAllPhotos] = useState([]);
  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axios.get(`/photos?albumId=${id}`);
        const data = await response.data;
        setAllPhotos(data);
      } catch (error) {
        throw new error(`HTTP error! ${error}`);
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
