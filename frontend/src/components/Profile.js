import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { Link } from 'react-router-dom'


const Profile = () => {

  const [favs, setFavs] = useState([])
  const [spots, setSpots] = useState([])
  const [name, setName] = useState('')

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
        .then(resp => setSpots(resp)))
    return () => console.log('Unmounting component')
  }, [])


  function deleteFavourite(id) {
    console.log(id)
    axios.delete(`/api/spots/${id}/favourite`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => setFavs(resp.data.favourites))
  }

  const SpotCard = (spot, id, spotId) => (
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
        <button className="button is-danger" onClick={() => deleteFavourite(spotId)}>X</button>
      </div>
    </div>
  )


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

      </div>
    </div>
  )

}



export default Profile

