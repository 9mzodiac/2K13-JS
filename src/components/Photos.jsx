import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/Global.css";
import NavBar from "./NavBar";
import "../css/Photos.css";
import PhotoDataModel from "../models/PhotoDataModel";
import Gallery from "react-grid-gallery";
import $ from "jquery";
import { SERVER_BASE_URL } from "../Constants";

function Photos(props) {
  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotosJSON() {
    const response = await fetch(`${SERVER_BASE_URL}/api/photos?populate=*`);
    const photos = await response.json();
    return photos;
  }

  const fetchPhotos = () => {
    fetchPhotosJSON()
      .then((json) => {
        const photos = json.data;
        if (photos.length > 0) {
          let fetchedPhotos = [];
          photos.map((photo) => {
            const imageRelativeURL =
              photo.attributes.imageURL.data.attributes.formats.thumbnail.url;
            const photoDataModel = new PhotoDataModel(
              `${SERVER_BASE_URL}${imageRelativeURL}`
            );
            fetchedPhotos = [...fetchedPhotos, photoDataModel];
          });
          setPhotos(fetchedPhotos);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    renderPhotosGallery();
  }, [photos]);

  const renderPhotosGallery = () => {
    const containerWidth = $("#springboard-container").width();
    const rows = 3;
    const margin = 2;
    const itemWidthHeight = containerWidth / rows;

    const images = photos.map((photo) => {
      return {
        src: photo.imageURL,
        thumbnail: photo.imageURL,
        thumbnailWidth: itemWidthHeight,
        thumbnailHeight: itemWidthHeight,
      };
    });

    ReactDOM.render(
      <Gallery
        images={images}
        rowHeight={itemWidthHeight}
        margin={margin}
        enableImageSelection={false}
      ></Gallery>,
      document.getElementById("photos-gallery-container")
    );
  };

  return (
    <div className="springboard-app-container">
      <NavBar title="Photos" onBackButtonClick={props.onBackButtonClick} />
      <div
        className="springboard-app-content-container"
        id="photos-gallery-container"
      ></div>
    </div>
  );
}

export default Photos;
