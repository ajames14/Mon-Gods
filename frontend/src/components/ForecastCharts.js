import React, { useState, useEffect } from 'react'
// import axios from 'axios'

const ForecastChart = ({ lat, lon }) => {
    const [forecastData, setForecastData] = useState([])
    
    console.log('LAT', lat)
    console.log('LON', lon)

    useEffect(() => {
        console.log('LAT2', lat)
        console.log('LON2', lon)

        fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,waveDirection,swellDirection,waterTemperature,windSpeed,windDirection,swellPeriod`, {
            headers: {
                'Authorization': 'b8804aa6-1ad4-11ea-a93c-0242ac130002-b8804bdc-1ad4-11ea-a93c-0242ac130002'
                // 'Authorization': '6e9efd2c-1847-11ea-8553-0242ac130002-6e9f0042-1847-11ea-8553-0242ac130002'
            }
        })
            .then(resp => resp.json())
            .then(resp => setForecastData(resp))
        console.log(forecastData)
    }, [])



    return (
        < h1 > HELWOJAJSD</h1 >
    )
}

export default ForecastChart
