import React, { useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";

export default function Portfolio() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [photos, setPhotos] = React.useState([null]);
  useEffect(() => {
    axios.get("https://vast-wave-57983.herokuapp.com/api/images").then(res => {
      setPhotos(res.data.map(photo => photo.img_url));
    });
  }, []);

  const slider = (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
      infinite={true}
    >
      {photos && photos.map(photo => <div data-src={photo} />)}
    </AutoplaySlider>
  );

  return slider;
}
