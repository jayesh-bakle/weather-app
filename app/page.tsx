"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import { MdCleaningServices } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
let WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_APP_API_KEY;
const Home = () => {

  const [place, setPlace] = useState("Kota");
  const [placeData,setPlaceData] = useState<any>(null);
  const currentTime = new Date().toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit',
    // second:'2-digit',

  });
  const getWeatherData = async () => {
    if (place != null && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("Get Weather data response", data);
        setPlaceData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input
          type="search"
          placeholder="City Name"
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={getWeatherData}><SearchIcon /></button>
      </div>
      {
        placeData && <div className={styles.row}>
          <div className={styles.section1}>

            <div className={styles.section11}>
              {
                placeData.weather[0].main === 'Clouds' && 
                <CloudQueueIcon className={styles.weathericon} />
              }
              {
                placeData.weather[0].main === 'Haze' && 
                <DehazeIcon className={styles.weathericon} />
              }
              {
                placeData.weather[0].main === 'Smoke' && 
                <SmokingRoomsIcon className={styles.weathericon} />
              }
              {
                placeData.weather[0].main === 'Clear' && 
                <MdCleaningServices  className={styles.weathericon} />
              }
              {
                placeData.weather[0].main === 'Sunny' && 
                <IoSunnyOutline className={styles.weathericon} />
              }

              <p className={styles.temp}>{(placeData?.main.temp - 273.15).toFixed(1)} <span>°C</span></p>

            </div>

            <div className={styles.section11}>
              <p className={styles.city}>{placeData?.name}</p>
              <p className={styles.weathertype}>{placeData?.weather[0].description}</p>
            </div>
          </div>
          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
          </div>
      }

{
        placeData &&
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature</p>
            <p className={styles.head2}>{(placeData?.main.temp - 273.15).toFixed(1)} °C</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Min</p>
            <p className={styles.head2}>{(placeData?.main.temp_min - 273.15).toFixed(1)} °C</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Max</p>
            <p className={styles.head2}>{(placeData?.main.temp_max - 273.15).toFixed(1)} °C</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Feels Like</p>
            <p className={styles.head2}>{(placeData?.main.feels_like - 273.15).toFixed(1)} °C</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Humidity</p>
            <p className={styles.head2}>{placeData?.main.humidity}</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>pressure</p>
            <p className={styles.head2}>{placeData?.main.pressure} mbar</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Visibility</p>
            <p className={styles.head2}>{placeData?.visibility/1000} km</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Wind Speed</p>
            <p className={styles.head2}>{placeData?.wind.speed} km/hr</p>
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
