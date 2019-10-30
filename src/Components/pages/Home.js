import React, { useState, useEffect } from "react";
import logo from "../../woman.jpg";
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
      {data &&
        data.map(item => (
          <div key={item._id} style={{ color: "#333", textDecoration: "none" }}>
            <h1>{item.first_name}</h1>
            <h3>{item.last_name}</h3>
            <p>{item.date}</p>
          </div>
        ))}
      <img alt="logo" src={logo} />
    </div>
  );
}
