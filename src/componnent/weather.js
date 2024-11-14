import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import { CiSearch } from "react-icons/ci";
import image4 from './images/humidity.png';
import image7 from './images/wind.png';
const Weather = () => {
    const [weatherdata , setWeatherdata] =useState({})
    const inputref =useRef()
     const search = async( city) =>{
        if(city== ""){
            alert('pleace enter city name')
        }
        try{
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbbc121887dc99c7410122c9497f1b6b&units=metric`;
            const response = await fetch(url);        
            const data = await response.json();
            if(!response.ok){
                alert(data.message)
            }
            console.log(data);
            setWeatherdata({
                tempreature : Math.floor(data.main.temp ),
                location :data.name,
                state : data.weather[0].main,
                humidity : data.main.humidity,
                wind : data.wind.speed ,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` ,
            })
        }
        catch(err){
            console.log(err);   
        }
     }
    useEffect(() => { search("cairo")},[])
    
  return (
    <div className='weather'>
        <div className='search'>
            <input type='text' placeholder='search' ref={inputref}/>
              <CiSearch onClick={()=>{search(inputref.current.value);
                inputref.current.value=""
              }}/>
        </div>
        <div className='content'>
              <img src={weatherdata.icon} alt='wether icon'/>
              <p>{weatherdata.tempreature}°c</p>
              <span>{weatherdata.state}</span>
              <p style={{ color:"#0B2F9F"}}>{weatherdata.location}</p>
        </div>
        <div className='data'>
            <div className='left'>
            <img src={image4} alt='o'/>
            <div>
                <p>{weatherdata.humidity}%</p>
                <p>Humidity</p>
            </div>
            </div>
            <div className='right'>
                <img src={image7} alt='o' />
                <div>
                    <p>{weatherdata.wind}Km/h</p>
                    <p>wind speed</p>
                </div>
            </div>
        </div>
        
        

    
    </div>
  )
}

export default Weather
