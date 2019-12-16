import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import ReactMapGL, { LinearInterpolator, FlyToInterpolator, Marker, Popup, GeolocateControl } from 'react-map-gl'
import axios from 'axios'

=======
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl'
>>>>>>> development
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
      zoom: 10,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator()
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
<<<<<<< HEAD

export default MiniSurfMap



// import React, { useState, useEffect } from 'react'
// import ReactMapGL, { LinearInterpolator, FlyToInterpolator, Marker, Popup, GeolocateControl } from 'react-map-gl'
// import axios from 'axios'
// const initialViewport = {
//   width: 500,
//   height: 500,
//   latitude: 44.84044,
//   longitude: -0.5805,
//   zoom: 8
// }
// const errorInitialState = {
//   errors: ''
// }
// const SinglespotMap  = ({ lat, long }) => {
//   const [viewport, setViewport] = useState(initialViewport)
//   const [spotdata, setSpotdata] = useState([])
//   const [showPopup, setShowPopup] = useState(null)
//   const [error, setError] = useState(errorInitialState)
//   useEffect(() => {
//     console.log('LONG', long)
//     console.log('-------------LATT', lat)
//     spotLongLat(lat, long)
//     console.log('-----------HSAIDHIASHDIAHSssdadsadasJDKAHJAKSCHKJ LONG', long)
//     console.log('-------------HSAIDHIASHDIAHSJDKAasdasdasdaHJAKSCHKJ LATT', lat)
//     console.log('..veiew', viewport)
//   }, [lat, long])


  
//   function spotLongLat() {
//     setViewport({
//       width: 300,
//       height: 300,
//       latitude: parseInt(lat),
//       longitude: parseInt(long),
//       zoom: 10,
//       transitionDuration: 3000,
//       transitionInterpolator: new FlyToInterpolator()
//     })
//   }
//   ///------------------------------------------------///
//   /// fix  moving the map moves the surfer           ///
//   ///------------------------------------------------///
//   return (
//     <React.Fragment>
//       <p>hello</p>
//       <ReactMapGL
//         {...viewport}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         mapboxApiAccessToken='pk.eyJ1IjoiYXdhbC15IiwiYSI6ImNrM3lqbnh0czA1YTQzZ3J1ZDRwaW15ZW8ifQ.48aoOHJL0iRF-Uf69S9tLQ'
//         onViewportChange={(viewport) => setViewport(viewport)}
//       >
//         <Marker
//           latitude={viewport.latitude}
//           longitude={viewport.longitude}
//         >
//           <div>🏄</div>
//         </Marker>
//       </ReactMapGL>
//     </React.Fragment>
//   )
// }
// export default SinglespotMap
=======
export default MiniSurfMap
>>>>>>> development
