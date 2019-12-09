//import React, { useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import styles from "./portStyle.css";

import axios from "axios";

import React, { useEffect, useState, useCallback } from "react";

// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
//import { photos } from "./photos";

function Portfolio() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [photos, setPhotos] = React.useState([null]);
  useEffect(() => {
    axios.get("https://vast-wave-57983.herokuapp.com/api/images").then(res => {
      setPhotos(res.data.map(photo => photo.img_url));
    });
  }, []);

  const slider = (
    <AutoplaySlider
      cssModule={styles}
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
      infinite={true}
      className="container-fluid"
    >
      {photos && photos.map(photo => <div data-src={photo} />)}
    </AutoplaySlider>
  );

  return slider;
}

/* function Portfolio1() {
  
  const [photos, setPhotos] = React.useState([null]);
  useEffect(() => {
    axios.get("https://vast-wave-57983.herokuapp.com/api/images").then(res => {
      setPhotos(res.data.map(photo => photo.img_url));
    });
  }, []);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
   return (
    <div>
      <Gallery photos={photos} direction={"column"}></Gallery>
    </div>
  ); 
}*/
export default Portfolio;
