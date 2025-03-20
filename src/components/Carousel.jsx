import React from "react";

const Carousel = () => {
  return (
    <section className="row">
      <div className="col-md-12">
        <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/slide1.jpg" className="d-block w-100" alt="Slide 1" />
            </div>
            {/* src="/banner1.webp" */}
            <div className="carousel-item">
              <img src="/slide2.jpg" className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="/slide3.jpg" className="d-block w-100" alt="Slide 3" />
            </div>
          </div>

          <a className="carousel-control-prev" href="#mycarousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#mycarousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
