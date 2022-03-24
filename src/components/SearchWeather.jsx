import React from "react";

export default function SearchWeather() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-dark text-white">
            <img src="images/bg.jpg" alt="" className="carf-img" />
            <div className="card-img-overlay">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">Last updated 3 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
