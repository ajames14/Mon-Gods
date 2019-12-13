import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import axios from 'axios'

const initialViewport = {
  width: 1000,
  height: 700,
  latitude: 44.84044,
  longitude: -0.5805,
  zoom: 3
}

const errorInitialState = {
  errors: ''
}

const SurfMap = () => {
  const [showPopup, setShowPopup] = useState(null)
  const [spotdata, setSpotdata] = useState([])
  const [viewport, setViewport] = useState(initialViewport)

  const [error, setError] = useState(errorInitialState)

  useEffect(() => {
    const spotsArray = spotdata
    axios.get('/api/spots')
      .then((response) => {
        response.data.map((spots) => spotsArray.push({
          lat: spots.lat, long: spots.long
        }))
        setSpotdata(filterSurfData(spotsArray))
        // console.log(spotsArray)
      })
      .catch(err => setError({ errors: err.response.status }))
  }, [])

  function filterSurfData(goodspots){
    return goodspots.filter(spots => {
      return spots.lat !== undefined || spots.long !== undefined
    })
  }

  function loadSurfMarkers(){
    // console.log(spotdata)
    return spotdata.map((spot, i) => {
      return (
        <Marker
          key={'marker' + i}
          latitude={Number(spot.lat)}
          longitude={Number(spot.long)}
        >
          <div>🏄🏽‍</div>
        </Marker>
      )
    })
  }

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken='pk.eyJ1IjoiYXdhbC15IiwiYSI6ImNrM3lqbnh0czA1YTQzZ3J1ZDRwaW15ZW8ifQ.48aoOHJL0iRF-Uf69S9tLQ'
        onViewportChange={(viewport) => setViewport(viewport)}
        className="big-surf-map"
      >
        {loadSurfMarkers()}
      </ReactMapGL>
    </React.Fragment>
  )

}

export default SurfMap