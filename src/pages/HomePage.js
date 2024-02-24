import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "../components/MapComponent";
import "./Homepage.css";
import { Link } from "react-scroll";
import QRCodeComponent from "../components/QRCode";

const HomePage = () => {
  const [placeId, setPlaceId] = useState("");
  const [subplaces, setSubplaces] = useState([]);
  const [selectedSubplace, setSelectedSubplace] = useState([]);
  const [places, setPlaces] = useState([]);
  const [timeslot, setTimeslot] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:5000/places");
        setPlaces(response.data);
        const timeslotResponse = await axios.get(
          "http://localhost:5000/timeslots"
        );
        setTimeslot(timeslotResponse.data);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (placeId) {
      fetchSubplaces(placeId);
    }
  }, [placeId]);

  const fetchSubplaces = async (placeId) => {
    try {
      const response = await axios.get("http://localhost:5000/subplace", {
        params: { placeId: placeId },
      });
      setSubplaces(response.data);
    } catch (error) {
      console.error("Failed to fetch subplaces:", error);
      setSubplaces([]);
    }
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/available_slots",
        {
          params: {
            placeId: placeId,
            subplaceId: selectedSubplace,
            timeslot: selectedTimeslot,
          },
        }
      );
      setData(response.data);
      console.log(data[0])
    } catch (err) {
      console.error("Failed to fetch data: " + err.message);
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <Link
          activeClass="active"
          to="hero-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Home
        </Link>
        <Link
          activeClass="active"
          to="map-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Map
        </Link>
        <Link
          activeClass="active"
          to="content-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Features
        </Link>
      </nav>
      <section id="hero-section" className="hero-section">
        <h1>Welcome to Our App</h1>
        <p>Scroll down to learn more</p>
      </section>

      <section id="split-section" className="split-section">
        <div className="left-side">
          {/* Other content remains unchanged */}
          <h3>Select Location and Timeslot</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="dropdown">
              <label htmlFor="place">Place:</label>
              <select
                id="place"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
              >
                <option value="">Select Place</option>
                {places.map((place) => (
                  <option key={place.place_id} value={place.place_id}>
                    {place.place_name}
                  </option>
                ))}
              </select>
            </div>

            {placeId && (
              <>
                <h2>Subplaces</h2>
                <select onChange={(e) => setSelectedSubplace(e.target.value)}>
                  <option value="">Select Subplace</option>
                  {subplaces.map((subplace) => (
                    <option key={subplace.id} value={subplace.id}>
                      {subplace.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <h2>Time</h2>
            <select onChange={(e) => setSelectedTimeslot(e.target.value)}>
              <option value="">Select Time Slot</option>
              {timeslot.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.start_time}-{time.end_time}
                </option>
              ))}
            </select>

            <div>
              <button onClick={handleButtonClick}></button>
            </div>

            <div>
              {data[0] && <QRCodeComponent latitude= {data[0].latitude} longitude= {data[0].longitude}/>}
          </div>
          </form>
        </div>
        <div className="right-side">
          {data[0] && <MapComponent position={data[0]} />}
          <p>Select a subplace to see it on the map.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
