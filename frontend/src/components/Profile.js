import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { Link } from 'react-router-dom'


const Profile = () => {

  const [favs, setFavs] = useState([])
  const [spots, setSpots] = useState([])
  const [name, setName] = useState('')
  const [auth, setAuth] = useState([])

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setFavs(resp.data.favourites)
        setName(resp.data.username)
      })
      .then(fetch('/api/spots')
        .then(resp => resp.json())
        .then(resp => {
          setSpots(resp)
          const authArray = [...auth]
          resp.forEach((e) => {
            if (e.authorized === false) {
              authArray.push(e._id)
            }
          })
          setAuth(authArray)
        }))
    return () => console.log('Unmounting component')
  }, [])


  function deleteFavourite(id) {
    axios.delete(`/api/spots/${id}/favourite`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => setFavs(resp.data.favourites))
  }

  const SpotCard = (spot, id, spotId, boolean) => (
    <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={spot.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <Link className="subtitle" to={`/spots/${spot._id}`}>{spot.spotName}</Link>
          <p className="has-text-grey-darker">{spot.country}</p>
        </div>
        {buttonShow(boolean, spotId)}
      </div>
    </div>
  )

  function buttonShow(boolean, spotId) {
    if (boolean === false) {
      return <button className="button is-success" onClick={() => authorize(spotId)}>X</button>
    } else {
      return <button className="button is-danger" onClick={() => deleteFavourite(spotId)}>X</button>
    }
  }

  function authorize(id) {
    axios.put(`/api/spots/${id}`, { authorized: true }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        const authArray = [...auth]
        authArray.forEach((e, i) => {
          if (e === id) {
            authArray.splice(i, 1)
            return
          }
        })
        setAuth(authArray)
      })
  }

  function checkEmpty() {
    if (favs.length === 0) {
      return <div className="subtitle grey">Go add some favourite places!</div>
    }
  }

  function isAdmin() {
    if (name === 'admin') {
      return 'To be Authorized:'
    }
  }


  return (
    <div className="container">
      <div className="title username">{name}</div>
      <div className="title favTitle"> Your Favourite Places: </div>
      <div className="columns is-mobile is-multiline" >
        {spots.map((spot, id) => {
          if (favs.includes(spot._id)) {
            return SpotCard(spot, id, spot._id)
          }
        })}
        {checkEmpty()}
      </div>
      <div className="title">{isAdmin()}</div>
      <div>
        {spots.map((spot, id, ) => {
          if (name === 'admin' && auth.includes(spot._id)) {
            return SpotCard(spot, id, spot._id, false)
          }
        })}
      </div>
    </div>
  )

}



export default Profile

