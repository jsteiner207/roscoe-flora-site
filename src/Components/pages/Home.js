import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
//import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import "./../../App.css";

export default function Home() {
  AOS.init();
  AOS.refresh();

  return (
    <div>
      <Container className="fliud">
        <img
          src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/59944219_334158860579047_5698019002912079872_n.jpg?_nc_cat=110&_nc_ohc=2xjfPXyJU5QAQmWlMxCP5uioy9wiQAuLMLz_7LNPhJ7Iqo9UMM8lguWYg&_nc_ht=scontent-ort2-2.xx&oh=0436cc6218ae50e426e4ad6b83746864&oe=5E7F958C"
          width="80%"
          margin="0 auto"
          alt=""
        />
      </Container>
      <Container className="p-3">
        <div className="container p-4 m-6">
          <div
            className="card mb-3"
            style={{ maxWidth: 900 }}
            data-aos="fade-left"
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/50860052_2240130622906480_4390607644927197184_n.jpg?_nc_cat=111&_nc_ohc=n9C0BoBZU8sAQlSm93n_BLJBF7yP83loMyZW7YQRc_SW5hOU6JaaJsFFg&_nc_ht=scontent-ort2-1.xx&oh=c95fc897b415284d2ed5c55cd371d804&oe=5E7FEE90"
                  className="card-img"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Welcome To Roscoe Flora</h5>
                  <p className="card-text">
                    Based in St. Louis, Missouri, Roscoe Flora aims to provide
                    its clients with expressive, fashionable, and top quality
                    photographs that resonate with the individual style of each
                    client. Photo sessions are conducted with the comfort of the
                    client in mind-- making Roscoe Flora a trustworthy
                    photographer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card mb-3"
            style={{ maxWidth: 900 }}
            data-aos="fade-right"
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/60063863_337602850234648_8012048498964824064_n.jpg?_nc_cat=104&_nc_ohc=fDCJ0gWxmRsAQmCC6bE_MtS49efp6ZLz6P8pSFDCQg5iOXmy-ln_GS7EA&_nc_ht=scontent-ort2-1.xx&oh=6a3b9021191fcb267ba30e9455202470&oe=5E77A7CD"
                  className="card-img"
                  alt="..."
                  fluid
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">What We Do</h5>
                  <p className="card-text">
                    Roscoe Flora specializes in portrait, fashion, and editorial
                    photography. As an example some of our past clients have had
                    cap n' gown photos taken, headshots for a portfolio, and
                    birthday shoots.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card mb-3"
            style={{ maxWidth: 900 }}
            data-aos="fade-left"
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/60871595_340595876602012_6500110579301089280_n.jpg?_nc_cat=101&_nc_ohc=PqDXdUivZK4AQk4EBSOHBk7MRun21hX1yEmQtoF10elJ8jp03CIjQ3JHA&_nc_ht=scontent-ort2-1.xx&oh=fe191feddec24c97e8b00d3bb366a27b&oe=5E82D2E3"
                  className="card-img"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Vision</h5>
                  <p className="card-text">
                    Roscoe Flora makes a statement without ever saying a word.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
