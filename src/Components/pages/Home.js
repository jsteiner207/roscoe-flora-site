import React, { useState, useEffect } from "react";
import fun from "../../woman.jpg";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://vast-wave-57983.herokuapp.com/api/items")
      .then(res => setData(res.data));
  }, []);
  return (
    <div>
      {" "}
      {data &&
        data.map(item => (
          <div
            key={item._id}
            style={{ color: "#333", textDecoration: "none" }}
          ></div>
        ))}
      <img alt="logo" src={fun} />
    </div>
  );
}
