import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-scroll';
import QRCodeComponent from '../components/QRCode';
import MapComponent from '../components/MapComponent';
import { motion } from 'framer-motion';
import './Homepage.css';

const HomePage = () => {
  const [placeId, setPlaceId] = useState('');
  const [subplaces, setSubplaces] = useState([]);
  const [selectedSubplace, setSelectedSubplace] = useState(''); // Corrected to single value
  const [places, setPlaces] = useState([]);
  const [timeslots, setTimeslots] = useState([]); // Changed to plural to reflect it's an array
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlacesAndTimeslots = async () => {
      try {
        const [placesResponse, timeslotResponse] = await Promise.all([
          axios.get('http://localhost:5000/places'),
          axios.get('http://localhost:5000/timeslots'),
        ]);
        setPlaces(placesResponse.data);
        setTimeslots(timeslotResponse.data); // Corrected variable name
      } catch (error) {
        console.error('Failed to fetch places or timeslots:', error);
      }
    };

    fetchPlacesAndTimeslots();
  }, []);

  useEffect(() => {
    if (placeId) {
      const fetchSubplaces = async () => {
        try {
          const response = await axios.get('http://localhost:5000/subplace', {
            params: { placeId },
          });
          setSubplaces(response.data);
        } catch (error) {
          console.error('Failed to fetch subplaces:', error);
        }
      };

      fetchSubplaces();
    } else {
      setSubplaces([]); // Clear subplaces if no place is selected
    }
  }, [placeId]);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/available_slots', {
        params: {
          placeId,
          subplaceId: selectedSubplace,
          timeslot: selectedTimeslot,
        },
      });
      setData([response.data]); // Assuming the response is an object, wrap in an array for consistency
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar fadeIn">
        <Link to="hero-section" spy={true} smooth={true} offset={-70} duration={500}>Home</Link>
        <Link to="map-section" spy={true} smooth={true} offset={-70} duration={500}>Map</Link>
        <Link to="content-section" spy={true} smooth={true} offset={-70} duration={500}>Features</Link>
      </nav>

      <motion.section id="hero-section" className="hero-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <h1>Welcome to Our App</h1>
        <p>Scroll down to learn more</p>
      </motion.section>

      <motion.section id="split-section" className="split-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.5 }}>
        <div className="left-side">
          <h3>Select Location and Timeslot</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="dropdown">
              <label htmlFor="place">Place:</label>
              <select id="place" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
                <option value="">Select Place</option>
                {places.map((place) => (
                  <option key={place.place_id} value={place.place_id}>{place.place_name}</option>
                ))}
              </select>
            </div>

            {placeId && (
              <>
                <h2>Subplaces</h2>
                <select id="subplace" value={selectedSubplace} onChange={(e) => setSelectedSubplace(e.target.value)}>
                  <option value="">Select Subplace</option>
                  {subplaces.map((subplace) => (
                    <option key={subplace.id} value={subplace.id}>{subplace.name}</option>
                  ))}
                </select>
              </>
            )}

            <h2>Time</h2>
            <select id="timeslot" value={selectedTimeslot} onChange={(e) => setSelectedTimeslot(e.target.value)}>
              <option value="">Select Time Slot</option>
              {timeslots.map((time) => (
                <option key={time.id} value={time.id}>{time.start_time}-{time.end_time}</option>
              ))}
            </select>

            <button onClick={handleButtonClick}>Check Availability</button>
          </form>
        </div>
        <div className="right-side">
          {data[0] && (
            <>
              <MapComponent position={[data[0].latitude, data[0].longitude]} />
              <QRCodeComponent latitude={data[0].latitude} longitude={data[0].longitude} />
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
