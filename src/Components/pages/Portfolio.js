import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

export default function Portfolio() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const slider = (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
      infinite={true}
    >
      <div data-src="https://i.imgur.com/IHu4dkl.png" />
      <div data-src="https://i.imgur.com/qkCCZN2.png" />
      <div data-src="https://i.imgur.com/NQIT1JH.png" />
      <div data-src="https://i.imgur.com/nUbzYZO.png" />
      <div data-src="https://i.imgur.com/nO8j7cI.png" />
      <div data-src="https://i.imgur.com/iLJbh7E.png" />
    </AutoplaySlider>
  );

  return slider;
}
