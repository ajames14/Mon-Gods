import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import ForecastChart from './ForecastCharts'

const SingleSpot = (props) => {

  const [data, setData] = useState([])
  const [rating, setRate] = useState(0)
  const [nums, setNum] = useState([])
  const [people, setPeople] = useState(0)
  const [error, setError] = useState('')

  const [forecastData, setForecastData] = useState([])

  useEffect(() => {
    fetch(`/api/spots/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp =>
        setData(resp),
      )
      .then(createRating())
      // .then(getForecast())
    // console.log('TESSSSSSSTYYYYYYYYYY', data.long)
    // console.log('lat', lat)
    return () => console.log('Unmounting component')
  }, [rating])
  // should run twice after first loading the spot

  let response = {}


  // function getForecast() {
  //   const lat = 60.936;
  //   const lng = 5.114;
  //   fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=waveHeight,waveDirection,swellDirection,waterTemperature,windSpeed,windDirection,swellPeriod`, {
  //     headers: {
  //       'Authorization': '6e9efd2c-1847-11ea-8553-0242ac130002-6e9f0042-1847-11ea-8553-0242ac130002'
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then(resp => {
  //       console.log("teklslkalksdjlakjdl",resp)
  //     })
  //   // console.log("tezsssashdajhsbd",forecastData)
  // }

  // function getForecast() {
  //   fetch(`https://api.stormglass.io/v1/weather/point?lat=${data.lat}&lng=${data.long}&params=waveHeight,waveDirection,swellDirection,waterTemperature,windSpeed,windDirection,swellPeriod`)
  //     .then(resp => resp.json())
  //     .then(resp =>
  //       setForecastData(resp),
  //     )
  //   console.log(forecastData)
  // }

  function createRating() {
    setNum([])
    fetch(`/api/spots/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => {
        response = resp
        setPeople(resp.rating.length)
        return resp.rating.forEach(e => {
          nums.push(e.rate)
          return nums
        })
      })
      .then(() => {
        if (nums.length > 0) {
          const added = nums.reduce((pre, i) => {
            return pre + i
          })
          return (added / (response.rating.length * 5))
        }
      })
      .then(resp => setRate(resp))
      .then(() => {
        if (rating === 0) {
          console.log('rating undefined')
        } else {
          waves()
        }
      })
    return () => console.log('updated')
  }

  // how the stars/waves are defined :
  // 1 = 0 - 20
  // 2 = 21 - 40
  // 3 = 41 - 60
  // 4 = 61 - 80
  // 5 = 81 - 100%

  const wave1 = document.querySelector('#wave1')
  const wave2 = document.querySelector('#wave2')
  const wave3 = document.querySelector('#wave3')
  const wave4 = document.querySelector('#wave4')
  const wave5 = document.querySelector('#wave5')

  const waveList = [wave1, wave2, wave3, wave4, wave5]

  const changeWave = (w) => {
    console.log(w)
    for (let i = 0; i < w; i++) {
      waveList[i].style.width = '100%'
    }
    for (let i = w; i < waveList.length; i++) {
      waveList[i].style.width = '0%'
    }
  }

  const waveCheck = (w) => {
    const newRating = rating.toFixed(2)
    console.log('sting 3', newRating.toString()[3])
    if (newRating.toString()[3] !== '0') {
      console.log(3)
      if (newRating.toString()[2] === '2' || newRating.toString()[2] === '4' || newRating.toString()[2] === '6' || newRating.toString()[2] === '8') {
        console.log(parseInt(newRating.toString()[3]) * 5 + '%')
        waveList[waveList.length - w].style.width = parseInt(newRating.toString()[3]) * 5 + '%'
      } else {
        console.log((parseInt(rating.toString()[3]) + 10) / 20 * 100 + '%')
        waveList[waveList.length - w].style.width = (parseInt(rating.toString()[3]) + 10) / 20 * 100 + '%'
      }
      //newRating.toString()[2] !== undefined || 
    } else if (newRating.toString()[2] !== 0) {
      console.log(2)
      if (newRating === '0.20' || newRating === '0.40' || newRating === '0.60' || newRating === '0.80') {
        waveList[waveList.length - w].style.width = '100%'
      } else {
        waveList[waveList.length - w].style.width = '50%'
      }
    } else {
      console.log(1)
      waveList[waveList.length - w].style.width = newRating.toString()[0] * 100 + '%'
    }
  }

  const waves = () => {
    if (rating === undefined) {
      return
    } else if (rating.toFixed(2) < 0.21) {
      changeWave(1)
      waveCheck(5)
    } else if (rating.toFixed(2) < 0.41) {
      changeWave(2)
      waveCheck(4)
    } else if (rating.toFixed(2) < 0.61) {
      changeWave(3)
      waveCheck(3)
    } else if (rating.toFixed(2) < 0.81) {
      changeWave(4)
      waveCheck(2)
    } else if (rating.toFixed(2) >= 0.81) {
      changeWave(5)
      waveCheck(1)
    }
  }
  const con = (num) => {
    submitRating(num)
  }

  function submitRating(num) {
    // console.log(rating)
    // console.log('submitted')
    axios.post(`/api/spots/${props.match.params.id}/rate`, { rate: num }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => createRating())
      .catch((err) => {
        if (err.response.data.message !== 'Unauthorized') {
          return setError(err.response.data.message)
        } else {
          setError('Unauthorized - please log in')
        }
      })
    if (rating !== undefined) {
      waves()
    }
  }

  function checkRating() {
    if (isNaN(rating)) {
      return 0
    }
    return rating.toFixed(2)
  }



  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-half-tablet">
            <p className="title">
              {data.spotName}
            </p>
            <p className="subtitle">
              {`${data.country} - ${data.region}`}
            </p>
            <p id="description">
              {data.description}
            </p>
          </div>
          <div className="column is-half-tablet">
            <img src={data.image} />
          </div>
          <div>Rating: {checkRating()} / {(checkRating() * 100).toFixed(2)}%
            <br />
            Or: {((checkRating()) * 5).toFixed(2)} stars
            <br />
            {people} people have rated
          </div>
        </div>
        <button className='is button' onClick={() => con(1)}>1</button>
        <button className='is button' onClick={() => con(2)}>2</button>
        <button className='is button' onClick={() => con(3)}>3</button>
        <button className='is button' onClick={() => con(4)}>4</button>
        <button className='is button' onClick={() => con(5)}>5</button>
        {error && <small className="help is-danger">
          {error}
        </small>}
        <br /> <br />
        <section className="section columns">
          <div className="imgDiv">
            <img className="ratingImg" id="wave1" src='../images/wave.png' />
          </div>
          <div className="imgDiv">
            <img className="ratingImg" id="wave2" src='../images/wave.png' />
          </div>
          <div className="imgDiv">
            <img className="ratingImg" id="wave3" src='../images/wave.png' />
          </div>
          <div className="imgDiv">
            <img className="ratingImg" id="wave4" src='../images/wave.png' />
          </div>
          <div className="imgDiv">
            <img className="ratingImg" id="wave5" src='../images/wave.png' />
          </div>
        </section>
      </div>
      <ForecastChart lat={data.lat} lon={data.long}/>
    </section>
  )
}

export default SingleSpot
