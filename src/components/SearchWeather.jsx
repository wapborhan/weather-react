import React, { useEffect, useState } from "react";
import { BsClouds, BsSearch } from "react-icons/bs";

export default function SearchWeather() {
  const [search, setSearch] = useState("kushtia");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchweather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c592f8067c77ca42448e23d171adb80f`
      );
      if (componentMounted) {
        setData(await response.json());
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchweather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = <BsClouds size={50} />;
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return (<div className="text-center mt-5">
      <div className="state mb-2 h1"><span style={{color:"red"}}>" {search} "</span> is not correct state</div>
      <div className="text mb-3 h2">Type Correct State</div>
      <a className="btn btn-success" href="/">Search Again</a>
    </div>);
  }
  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  // Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmir = (event) => {
    event.preventDefault();
    setSearch(input);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card text-white text-center border-0">
            <img
              src={`https://source.unsplash.com/600x800/?${data.weather[0].main}`}
              alt=""
              className="card-img"
            />
            <div className="card-img-overlay p-5">
              <form onSubmit={handleSubmir}>
                <div className="input-group mb-3 q-75 mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Cith"
                    aria-label="Search Cith"
                    aria-describedby="basic-addon2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    requred
                  ></input>
                  <button className="input-group-text" id="basic-addon2">
                    <BsSearch />
                  </button>
                </div>
              </form>
              <div className="bg-dark  bg-opacity-50 py-3">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text lead">
                  {day}, {month} {date} {year}
                  <br />
                  {time}
                </p>
                <hr />
                {emoji}
                <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                <p className="lead">
                  {temp_min} &deg;C | {temp_max} &deg;C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
