import React, { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default function Service() {
  const [state, setState] = React.useState({
    headshot: 0,
    portraiture: 0,
    fashion: 0,
    instudio: 0,
    outstudio: 0,
    location: 0,
    dresschanges: 0,
    freelocation: 0,
    freechange: 0
  });

  useEffect(() => {
    axios
      .get("https://vast-wave-57983.herokuapp.com/api/prices")
      .then(res => setState(res.data[0]));
  }, []);

  //axios iumport price table then send data to table via variables

  return (
    <div>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Location(s)</th>
              <th>Outfit Limit</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Headshot</td>
              <td>In Studio</td>
              <td>0</td>
              <td>${state.headshot}</td>
            </tr>
            <tr>
              <td>On-Location Photoshoot</td>
              <td>4*</td>
              <td>4*</td>
              <td>
                $
                {state.fashion > state.portraiture
                  ? state.fashion + state.outstudio
                  : state.portraiture + state.outstudio}
              </td>
            </tr>
            <tr>
              <td>Studio Photoshoot</td>
              <td>Studio</td>
              <td>4*</td>
              <td>
                $
                {state.fashion > state.portraiture
                  ? state.fashion + state.instudio
                  : state.portraiture + state.instudio}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <p>
        <strong>
          *Disclaimer: There is a ${state.location} surcharge for each location
          after {state.freelocation} location(s). There is also a $
          {state.dresschanges} surcharge for each outfit change after{" "}
          {state.freechange} outfit(s).
        </strong>
      </p>
    </div>
  );
}
