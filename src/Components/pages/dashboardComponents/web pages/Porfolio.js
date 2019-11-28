import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Portfolio() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = React.useState([null]);

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "darwin");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtdzxszok/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);

    //   axios
    //   .("http://localhost:5000/api/images", data)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));
  };

  const storeImage = () => {
    let data = {
      img: image
    };

    axios
      .post("https://vast-wave-57983.herokuapp.com/api/images", data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get("https://vast-wave-57983.herokuapp.com/api/images").then(res => {
      setPhotos(res.data.map(photo => photo.img_url));
    });
  }, []);

  return (
    <div>
      <h1>Upload image</h1>
      <input
        type="file"
        name="file"
        placeholder="upload an image"
        onChange={uploadImage}
      />

      {loading ? (
        <h3>loading..</h3>
      ) : (
        <img src={image} style={{ width: "300px" }} />
      )}
      <button onClick={storeImage}>click to store</button>

      {photos &&
        photos.map(photo => (
          <img src={photo} style={{ width: 100, height: 100, padding: 40 }} />
        ))}
    </div>
  );
}
