import React from "react"
import "../src/App.css"
import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import DehazeIcon from '@mui/icons-material/Dehaze';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import WbSunnyIcon from '@mui/icons-material/WbSunny';



export default function App() {
  let key = import.meta.env.REACT_APP_API_KEY


  const [place, setPlace] = useState("Delhi")
  const [placeData, setPlaceData] = useState(null)


  const curruntTime = new Date().toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
  })

  const fetchWeatherData = async()=>{
    if(place && place.length>0){
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}`
        let res = await fetch(url)
        let data = await res.json()
        console.log(data)
        setPlaceData(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(()=>{
    fetchWeatherData()
  },[])
  

  return (
    <div className="outerdiv">
      <h1 className="title">WEATHER APP</h1>
    <div className="searchbar">
      <input type="search" placeholder="City name" onChange={(e)=>setPlace(e.target.value)} />
      <button onClick={fetchWeatherData}><SearchIcon/></button>
    </div>

    {
      placeData && <div className="row">
        <div className="section1">
          <div className="section11">
          {
                placeData.weather[0].main === 'Clouds' &&
                <FilterDramaIcon className="weathericon" />
              }
              {
                placeData.weather[0].main === 'Haze' &&
                <DehazeIcon className="weathericon" />
              }
              {
                placeData.weather[0].main === 'Smoke' &&
                <VapingRoomsIcon className="weathericon" />
              }
              {
                placeData.weather[0].main === 'Clear' &&
                <WbSunnyIcon className="weathericon" />
              }

              <p className="temp">{(placeData?.main.temp - 273.15).toFixed(1)} <span>°C</span></p>
          </div>
          <div className="section11">
          <p className="city">{placeData?.name}</p>
              <p className="weathertype">{placeData?.weather[0].main}</p>
          </div>
        </div>

        <div className="timediv">
          <p className="time">{curruntTime}</p>
        </div>
      </div>
    }

{
        placeData &&
        <div className="section2">
          <div className="section21">
            <p className="head1">Temperature</p>
            <p className="head2">{(placeData?.main.temp - 273.15).toFixed(1)} °C</p>
          </div>

          <div className="section21">
            <p className="head1">Temperature Min</p>
            <p className="head2">{(placeData?.main.temp_min - 273.15).toFixed(1)} °C</p>
          </div>

          <div className="section21">
            <p className="head1">Temperature Max</p>
            <p className="head2">{(placeData?.main.temp_max - 273.15).toFixed(1)} °C</p>
          </div>

          <div className="section21">
            <p className="head1">Humidity</p>
            <p className="head2">{placeData?.main.humidity}</p>
          </div>

          <div className="section21">
            <p className="head1">pressure</p>
            <p className="head2">{placeData?.main.pressure}</p>
          </div>

          <div className="section21">
            <p className="head1">Visibility</p>
            <p className="head2">{placeData?.visibility}</p>
          </div>
          <div className="section21">
            <p className="head1">Wind Speed</p>
            <p className="head2">{placeData?.wind.speed} km/hr</p>
          </div>
        </div>
      }
    </div>
  )
}
