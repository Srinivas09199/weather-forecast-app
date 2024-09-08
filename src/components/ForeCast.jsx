import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cloudICon from "../assets/icons/cloud.png"
import rainIcon from "../assets/icons/rain.png"
import sunIcon from "../assets/icons/sun.jpeg"

const ForeCast = () => {

    const [foreCastData, setForeCastData] = useState([])
    
    const [Loading, setLoading] = useState(true)

    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    
    const {cityName} = useParams()
    const APIKEY = import.meta.env.VITE_API_KEY

    useEffect(() => {

        const fetchForeCastData = async () => {
            try {
               const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`)
               const dailyForecasts = res.data.list.filter((item, index) => index % 8 === 0) 
               setForeCastData(dailyForecasts)
               setLoading(false)
               console.log(dailyForecasts)
                
            } catch (err) {
                console.log("fetching error weather", err)
                setLoading(false)
            }
        }
        fetchForeCastData();
    },[cityName])


    
   
  
    return (
    <div className='p-2'>
        <h1 className='text-white font-bold text-3xl mb-2'>Forecast</h1>
        {
            Loading?(
                <p>Loading...</p>
            ):(
                <div className='flex xl:gap-5 flex-col xl:flex-row'>
                    {
                        foreCastData.map((day, index) => {
                            let weatherIcon;
                            if (day.weather[0].main === "Clouds") {
                                weatherIcon = cloudICon
                            }
                            else if (day.weather[0].main === "Rain") {
                                weatherIcon = rainIcon
                            }
                            else if (day.weather[0].main === "Clear") {
                                weatherIcon = sunIcon
                            }

                            //extracting date

                            const date = new Date(day.dt_txt)
                            const foreCastDate = date.toLocaleDateString('en-US',
                                {weekday: "long", year: "numeric", month: "long", day: "numeric"}
                            )

                            return(
                                <div key={index} className='flex flex-col xl:gap-2 items-center text-white'>
                                <p className='font-semibold'>Date : {foreCastDate}</p>
                                <img src={weatherIcon} alt="" className='w-[30px]'/>
                                <p className='font-semibold'>Max Temp {(day.main.temp_max-273.15).toFixed(2)}°c</p>
                                <p className='font-semibold'>Min Temp: {(day.main.temp_min-273.15).toFixed(2)}°c</p>
                                <p>{day.weather[0].description}</p>
                                <p>{(day.pop*100)}%</p>
                            </div>
                            )

                            
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default ForeCast