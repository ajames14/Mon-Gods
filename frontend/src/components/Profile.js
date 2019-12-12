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

  const [auth, setAuth] = useState([])
  const [spotsMade, setMade] = useState([])


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
        .then(resp => {
          setSpots(resp)
          const authArray = [...auth]
          const madeArray = [...spotsMade]
          resp.forEach((e) => {
            if (e.authorized === false) {
              authArray.push(e._id)
            }
            if (e.user.userId === Auth.getUserId()) {
              madeArray.push(e)
            }
          })
          setAuth(authArray)
          setMade(madeArray)
        }))
    return () => console.log('Unmounting component')
  }, [])


  function deleteFavourite(id) {
    axios.delete(`/api/spots/${id}/favourite`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => setFavs(resp.data.favourites))
  }

  function checkRating(rating) {
    const rate2 = []
    rating[0].forEach((e) => {
      rate2.push(e.rate)
    })
    const parsed = (parseInt(rate2) / rate2.length)
    if (!parsed) {
      return 'no rating yet'
    }
    return parsed.toFixed(0)
  }


  const SpotCard = (spot, id, spotId, boolean, made) => (
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
          <div>Rating: {checkRating([spot.rating])}
          </div>
        </div>
        {buttonShow(boolean, spotId, made, spot)}
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

  function buttonShow(boolean, spotId, made, spot) {
    if (!boolean && made) {
      return <button className="button is-success" onClick={() => authorize(spotId)}>Authorize</button>
    } else if (made) {
      return <button className="button is-danger" onClick={() => deleteFavourite(spotId)}>X</button>
    } else {
      if (!spot.authorized) {
        return <div>Request pending approval</div>
      }
      return <div>This spot has been approved</div>
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
      <div className="columns is-mobile is-multiline">
        {spots.map((spot, id) => {
          if (favs.includes(spot._id)) {
            return SpotCard(spot, id, spot._id, true, true)
          }
        })}
        {checkEmpty()}
      </div>
      <div className="title">{isAdmin()}</div>
      <div className="columns is-mobile is-multiline">
        {spots.map((spot, id, ) => {
          if (name === 'admin' && auth.includes(spot._id)) {
            return SpotCard(spot, id, spot._id, false, true)
          }
        })}
      </div>
      <div className="title">Spots you have created</div>
      <div className="columns is-mobile is-multiline">
        {spotsMade.map((spot, id, ) => {
          console.log(spot.spotName)
          return SpotCard(spot, id, spot._id, false, false)
        })}
      </div>
    </div>

  )

}



export default Profile

