import React, { useState, useEffect } from "react";
import fun from "../../woman.jpg";
import axios from "axios";
import DefaultImg from "../../woman.jpg";

class Home extends React.Component {
  render() {
    return (
      <div>
        <img src={DefaultImg} alt="upload-image" />
      </div>
    );
  }
}

export default Home;
