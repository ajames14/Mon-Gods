import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { Link } from 'react-router-dom'

const pictureInitialState = {
  profilePicture: ''
}

const errorInitialState = {
  errors: ''
}

const Profile = () => {

  const [favs, setFavs] = useState([])
  const [spots, setSpots] = useState([])
  const [name, setName] = useState('')
  const [initialPic, changingPic] = useState(pictureInitialState)
  const [picture, updatePicture] = useState(pictureInitialState)
  const [error, setError] = useState(errorInitialState)

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setFavs(resp.data.favourites)
        setName(resp.data.username)
        updatePicture(!resp.data.profilePicture ? 'https://www.driverhire.co.uk/wp-content/themes/driver-hire/img/placeholder-person.jpeg' : resp.data.profilePicture)
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

  function handleInput(e) {
    changingPic({ profilePicture: e.target.value })
    console.log(initialPic)
    setError({ ...error, errors: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!initialPic) return
    axios.put('/api/profile', initialPic, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => updatePicture(resp.data.userProfilePicture))
      .catch((err) => setError({ errors: err.response.data }))
  }

  return (
    <div className="container">
      <div className="title username">{name}</div>
      <img src={!picture ? 'https://www.driverhire.co.uk/wp-content/themes/driver-hire/img/placeholder-person.jpeg' : picture }></img>
      <form className='form' onSubmit={e => handleSubmit(e)}>
        <div className='field'>
          <label className='label'>Upload Profile Picture</label>
          <input
            onChange={e => handleInput(e)}
            type="text"
            className="input"
            value={picture.profilePicture}
          />
        </div>
        <button className="button">Upload</button>
      </form>
      <div className="title favTitle"> Your Favourite Places: </div>
      <div className="columns is-mobile is-multiline" >
        {spots.map((spot, id) => {
          if (favs.includes(spot._id)) {
            return SpotCard(spot, id, spot._id)
          }
        })}

      </div>
      <div>

      </div>
    </div>
  )

}



export default Profile

