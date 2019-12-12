import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const intitalForcastData = { 
    swellDirection:[],
    waveHeight:[],
    windSpeed:[],
    waterTemperature:[],
    waveDirection:[],
    swellPeriod:[]
} 

const ForecastChart = ({ lat, lon }) => {

    const [forecastData, setForecastData] = useState(intitalForcastData)

    const [latt, setLatt] = useState('')
    const [lonn, setLonn] = useState('')

    // const [swellPeriod, setSwellPeriod] = useState('')
    // const [waveHeight, setWaveHeight] = useState('')
    // const [windSpeed, setWindSpeed] = useState('')
    // const [waterTemperature, setWaterTemperature] = useState('')
    // const [waveDirection, setWaveDirection] = useState('')
    const [swellDirection, setSwellDirection] = useState()

    const [loading, setLoading] = useState(false)

    // console.log('LAT11111111', lat)
    // console.log('LON11111111', lon)

    console.log('forecastData', forecastData)

    // console.log('forecastData.swellDirection', forecastData.swellDirection)

    const averageSwellPeriod = (forecastData.swellPeriod.map(x => x.value)).reduce((a, b) => a + b, 0)/forecastData.swellPeriod.length
    // console.log('swellPeriod arr AVERAGE',averageSwellPeriod)
    
    const averageWaveHeight = (forecastData.waveHeight.map(x => x.value)).reduce((a, b) => a + b, 0)/forecastData.waveHeight.length
    // console.log('waveHeight arr AVERAGE',averageWaveHeight)
    
    const averageWindSpeed = (forecastData.windSpeed.map(x => x.value)).reduce((a, b) => a + b, 0)/forecastData.windSpeed.length
    // console.log('windSpeed arr AVERAGE',averageWindSpeed)
    
    const averageWaterTemperature = (forecastData.waterTemperature.map(x => x.value)).reduce((a, b) => a + b, 0)/forecastData.waterTemperature.length
    // console.log('waterTemperature arr AVERAGE',averageWaterTemperature)
    
    const averageWaveDirection = (forecastData.waveDirection.map(x => x.value)).reduce((a, b) => a + b, 0)/forecastData.waveDirection.length
    // console.log('waveDirection arr AVERAGE',averageWaveDirection)
    
    const averageSwellDirection = (forecastData.swellDirection.map(x => x.value)).reduce((a, b) => a + b, 0)/forecastData.swellDirection.length
    // console.log('swellDirection arr AVERAGE',averageSwellDirection)
    
    // console.log('swellDirectionlegnth', forecastData.swellDirection.length)
    // console.log('swellDirectionlegnth SUMM', forecastData.swellDirection.reduce((a, b) => a + b, 0))

    // const stuff = (forecastData.swellDirection.map(x => x.value))
    // console.log(stuff)
    
    // const stuffSwellP = (forecastData.swellPeriod.map(x => x.value))
    // console.log(stuffSwellP)

    // console.log('forecastData.swellDirection[0]', forecastData.swellDirection[0])

    // console.log('setSwellDirectionlakjslkajslk', swellDirection)

    // console.log('forecastData.swellDirection[0]', forecastData.swellDirection[0])
    // console.log('forecastData[0]', forecastData[0])

    // console.log('forecastData[0].swellDirection', forecastData[0].swellDirection)


    // console.log('forecastData.hours', forecastData.hours)
    // console.log('forecastData.hours[0]', forecastData.hours)
    // console.log('forecastData.meta', forecastData.meta)

    // console.log('forecastData.hours[1]', forecastData.hours.0)
    // console.log('FORECASSSSSS', if(forecastData) ? true : false)

    ///------------------------------------------------///
    ///  cannot get into the data layers and pull out  ///
    ///  correct data that i need                      ///
    ///------------------------------------------------///

    useEffect(() => {
        getForecast(lat, lon)
    }, [lat, lon])


    function swellDirectionSet() {
        setSwellDirection(forecastData.swellDirection)
    }

    function getForecast(lat, lon) {
        fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,waveDirection,swellDirection,waterTemperature,windSpeed,windDirection,swellPeriod`, {
            headers: {
                // 'Authorization': 'b8804aa6-1ad4-11ea-a93c-0242ac130002-b8804bdc-1ad4-11ea-a93c-0242ac130002'
                // 'Authorization': '6e9efd2c-1847-11ea-8553-0242ac130002-6e9f0042-1847-11ea-8553-0242ac130002'
                'Authorization': 'd54eb8a4-1c03-11ea-afbb-0242ac130002-d54eb9c6-1c03-11ea-afbb-0242ac130002'
                // 'Authorization': '90dc9ef0-1c41-11ea-a453-0242ac130002-90dca008-1c41-11ea-a453-0242ac130002'
            }
        })
            .then(resp => resp.json())
            .then(resp =>
                setForecastData(resp.hours[0])
                // setSwellDirection(resp.hours[0].swellDirection)
            )
            .then(swellDirectionSet())
        console.log('FOREEEECASSSTTT DATAA', forecastData)
    }
    //  getForecast(lat, lon)




    // useEffect(lat, lon)
    // console.log('LAT', lat)
    // console.log('LON', lon)

    // setLatt(lat)
    // setLonn(lon)
    // console.log('LATTTTTTTTTT', latt)
    // console.log('LONNNNNNNNNN', lonn)
    // useEffect((lat, lon) => {
    //     console.log('LAT2', lat)
    //     console.log('LON2', lon)

    //     fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,waveDirection,swellDirection,waterTemperature,windSpeed,windDirection,swellPeriod`, {
    //         headers: {
    //             'Authorization': 'b8804aa6-1ad4-11ea-a93c-0242ac130002-b8804bdc-1ad4-11ea-a93c-0242ac130002'
    //             // 'Authorization': '6e9efd2c-1847-11ea-8553-0242ac130002-6e9f0042-1847-11ea-8553-0242ac130002'
    //         }
    //     })
    //         .then(resp => resp.json())
    //         .then(resp => setForecastData(resp))
    //         .then()
    //     console.log(forecastData)
    // }, [])
    // <CircularProgressbar value={percentage} text={`${percentage}%`} />
    return (
        <div className="columns">
            <div className="column">
                <p>Swell Period</p>
                <CircularProgressbar value={averageSwellPeriod} minValue={0} maxValue={30} text={`${averageSwellPeriod.toFixed(2)}s`} />
            </div>
            <div className="column">
                <p>Wave Height</p>
                <CircularProgressbar value={averageWaveHeight} minValue={0} maxValue={35} text={`${averageWaveHeight.toFixed(2)}m`} />
            </div>
            <div className="column">
                <p>Wind Speed</p>
                <CircularProgressbar value={averageWindSpeed} minValue={0} maxValue={62} text={`${averageWindSpeed.toFixed(2)}m/s`} />
            </div>
            <div className="column">
                <p>Water Temperature</p>
                <CircularProgressbar value={averageWaterTemperature} minValue={-20} maxValue={40} text={`${averageWaterTemperature.toFixed(2)}°C`} />
            </div>
            <div className="column">
                <p>Wave Direction</p>
                <CircularProgressbar value={averageWaveDirection} minValue={-5} maxValue={40} text={`${averageWaveDirection.toFixed(0)}°C`} />
            </div>
            <div className="column">
                <p>Swell Direction</p>
                <CircularProgressbar value={averageSwellDirection} minValue={-5} maxValue={40} text={`${averageSwellDirection.toFixed(0)}°C`} />
            </div>
        </div>
    )
}

export default ForecastChart
