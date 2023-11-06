import React, { useEffect, useState } from 'react'
import axios from "axios"
import apiKeys from './APIkey';
import "./Forcast.css"
// import ReactAnimatedWeather from "react-animated-weather"

function Forcast(props){
    const [query,setQuery] = useState("");
    const [error,setError] = useState("");
    const [weather,setWeather] = useState({});

    const search = (city) =>{

        axios.get(
            `${apiKeys.base}weather?q=${
                city !== "[object Object]" ? city : query
              }&units=metric&APPID=${apiKeys.key}`
        )
        .then((response)=>{
            setWeather(response.data);
            console.log(response.data)
            setQuery("");
        })
        .catch(function(error){
            setQuery("");
            setWeather("")
            setError({message:"Not Found", query:query})
        });

    }
        // const defaults = {
        //     color:"white",
        //     size:122,
        //     animate:"true"
        // }
    
    useEffect(() =>{
        //  console.log(weather.sys.country)
        search("Delhi")
        },[]);
  return (
    <div>
        {/* <ReactAnimatedWeather icon = {props.icon} size = {defaults.size} color = {defaults.color} animate = {defaults.animate}></ReactAnimatedWeather> */}
        <div className='search-conatiner'>
            <div className='search_and_icon'>
                <input placeholder='Search any city' value={query} type='text' onChange={(e)=>setQuery(e.target.value)} className='search-bar'/>
                <i class="fa fa-search" onClick={search}></i>
            </div>
            <div>
                <div className='content-header'>
                    <ul>
                        {typeof weather.main !== "undefined" ? (
                        <div>
                            <li className='city_country'>
                                <div>{weather.name}, {weather.sys.country}</div>
                            </li>
                            <li className='li'><p>Temperature</p><p><span>{weather.main.temp}&deg;c({weather.weather[0].description})</span></p></li>
                            <li className='li'><p>Humidity </p><p><span>{weather.main.humidity}%</span></p></li>
                            <li className='li'><p>Visibility </p><p><span>{weather.visibility}mi</span></p></li>
                            <li className='li'><p>Wind Speed </p><p><span>{weather.wind.speed}km/h</span></p></li>
                        </div>
                        ):(
                            <li className='error-message'><p>{error.query}{error.message}</p></li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forcast
