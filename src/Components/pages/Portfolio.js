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
      <div data-src="https://i.ibb.co/rHVVp06/2-qk-CCZN2.png" />
      <div data-src="https://i.ibb.co/pr1cjX4/3-NQIT1-JH.png" />
      <div data-src="https://i.ibb.co/72J5TPq/4-n-Ubz-YZO.png"/>
      <div data-src="https://i.ibb.co/86xTPP4/5-n-O8j7c-I.png" />
      <div data-src="https://i.ibb.co/wgSkbtk/6-i-LJbh7-E.png" />
      
    </AutoplaySlider>
  );

  return slider;
}
