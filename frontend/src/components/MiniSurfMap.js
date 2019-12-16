import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl'
const initialViewport = {
  width: 500,
  height: 500,
  latitude: 44.84044,
  longitude: -0.5805,
  zoom: 8
}
const errorInitialState = {
  errors: ''
}
const MiniSurfMap = ({ lat, lon }) => {
  const [showPopup, setShowPopup] = useState(null)
  const [spotdata, setSpotdata] = useState([])
  const [viewport, setViewport] = useState(initialViewport)
  const [error, setError] = useState(errorInitialState)
  // console.log('asJDKAHJAKSCHKJ LONG', lon)
  // console.log('HsdasdaHJAKSCHKJ LATT', lat)
  useEffect(() => {
    console.log('LONG', lon)
    console.log('-------------LATT', lat)
    spotLongLat(lat, lon)
    console.log('-----------HSAIDHIASHDIAHSssdadsadasJDKAHJAKSCHKJ LONG', lon)
    console.log('-------------HSAIDHIASHDIAHSJDKAasdasdasdaHJAKSCHKJ LATT', lat)
    console.log('..veiew', viewport)
  }, [lat, lon])
  
  ///------------------------------------------------///
  ///  how do you update only parts of the object... ///
  ///------------------------------------------------///
  function spotLongLat(lat, lon) {
    setViewport({
      width: 300,
      height: 300,
      latitude: parseInt(lat),
      longitude: parseInt(lon),
      zoom: 1
    })
  }
  // spotLongLat()
  ///------------------------------------------------///
  /// fix  moving the map moves the surfer           ///
  ///------------------------------------------------///
  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken='pk.eyJ1IjoiYXdhbC15IiwiYSI6ImNrM3lqbnh0czA1YTQzZ3J1ZDRwaW15ZW8ifQ.48aoOHJL0iRF-Uf69S9tLQ'
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
        >
          <div>🏄🏽‍</div>
        </Marker>
      </ReactMapGL>
    </React.Fragment>
  )
}
export default MiniSurfMap