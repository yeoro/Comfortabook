import React from "react";
import Carousel from "nuka-carousel";

export default class extends React.Component {
  componentDidMount() {
    this.setState({
      mode: "Home",
    });
  }

  render() {
    return (
      <div style={{ height: "300px" }}>
        <Carousel>
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide1"
            alt="slice1"
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide2"
            alt="slice1"
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide3"
            alt="slice1"
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide4"
            alt="slice1"
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide5"
            alt="slice1"
          />
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=slide6"
            alt="slice1"
          />
        </Carousel>
      </div>
    );
  }
}
