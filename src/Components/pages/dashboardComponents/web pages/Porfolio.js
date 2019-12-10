import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";

export default function Portfolio() {
  const [disabled, setDisabled] = React.useState(false);
  const [image, setImage] = useState("");
  const [id, setId] = React.useState("");
  const [photos, setPhotos] = React.useState([null]);
  const [pubid, setPubid] = React.useState([null]);
  const [info, setInfo] = React.useState([]);

  var files = [];

  const deleteImage = index => {
    let updater = { updated: "yup" };
    axios
      .post("https://vast-wave-57983.herokuapp.com/api/images/delete", {
        pub_id: pubid[index]
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    setPhotos([...photos, updater]);
  };

  const uploadImage = async e => {
    files = e.target.files;
    setImage(URL.createObjectURL(files[0]));
    console.log(files);
    setInfo(files);
    setDisabled(false);
  };

  const storeImage = async () => {
    let updater = { updated: "yup" };
    const data = new FormData();
    data.append("file", info[0]);
    data.append("upload_preset", "darwin");
    console.log(data);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtdzxszok/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();
    console.table(file);
    await setId(file.public_id);
    let clouddata = {
      img: file.url,
      pub_id: id
    };

    axios
      .post("https://vast-wave-57983.herokuapp.com/api/images", clouddata)
      .then(res => {
        console.log(res.data);
        setDisabled(true);
        setPhotos([...photos, updater]);
      })
      .catch(err => console.log(err));

    setPhotos([...photos, updater]);
  };

  useEffect(() => {
    axios.get("https://vast-wave-57983.herokuapp.com/api/images").then(res => {
      setPhotos(res.data.map(photo => photo.img_url));
      setPubid(res.data.map(photo => photo.pub_id));
    });
  }, [photos.length]);

  return (
    <div>
      <h1>Upload image</h1>
      <div style={{ padding: 10 }}>
        <Button variant="contained" color="primary">
          <input type="file" name="file" onChange={uploadImage} />
        </Button>
      </div>

      <br />

      <img src={image} style={{ width: "300px" }} />
      <br />
      {image !== "" ? (
        <div style={{ padding: 10 }}>
          <Button
            disabled={disabled}
            color="Primary"
            variant="outlined"
            onClick={storeImage}
          >
            click to store
          </Button>
        </div>
      ) : null}

      <Divider />

      {photos &&
        photos.map((photo, i) => (
          <React.Fragment>
            <Button
              onClick={() => deleteImage(i)}
              color="secondary"
              variant="outlined"
            >
              delete
            </Button>
            <img src={photo} style={{ width: 200, height: 200, padding: 10 }} />
            <br />
          </React.Fragment>
        ))}
    </div>
  );
}
