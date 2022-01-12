import React, { useEffect, useState } from 'react'
import "../components/style.css";
import WeatherDetails from "./WeatherDetails"

function SearchMain() {

    const [searchTerm,setSerchTerm] = useState("mumbai")
    const [tempInfo,setTempInfo] = useState({});
    // console.log(searchTerm)

    const getWeatherInfo = async () => {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=84789a330dc18a9e89c3580262cc9734`
            let res = await fetch(url);
            let data = await res.json();
            const {temp,humidity,pressure} = data.main;
            const {main : weatherType} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country,sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,humidity,pressure,weatherType,name,speed,country,sunset
            };

            setTempInfo(myNewWeatherInfo);
            

            // console.log(data);
        } catch (error) {
            console.log(error)
        }

    };

    //http://api.openweathermap.org/data/2.5/weather?q=kochi&appid=84789a330dc18a9e89c3580262cc9734

    useEffect( () => {
        getWeatherInfo()
    },[])
    return (
        <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='Search City..' id='search' value={searchTerm} onChange={(e)=> setSerchTerm(e.target.value)} />
            
            <button className='searchButton' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>
        < WeatherDetails {...tempInfo} />
        </>
    )
}

export default SearchMain
