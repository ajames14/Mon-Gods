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
      <div className="card small-card hvr-grow">
        <div className="card-image">
          <Link to={`/spots/${spot._id}`}>
            <figure className="small-img image is-4by3">
              <img src={spot.image} alt="Placeholder image" />
            </figure>
          </Link>
        </div>
        <Link to={`/spots/${spot._id}`} className="card-content">
          <div className="subtitle name" to={`/spots/${spot._id}`}>{spot.spotName}</div>
          <p className="has-text-grey-darker">{spot.country}</p>
          <div className="has-text-grey-darker">Rating: {checkRating([spot.rating])}
          </div>
        </Link>
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
      return <button className="button is-success level-left blue-text button-left" onClick={() => authorize(spotId)}>Authorize</button>
    } else if (made) {
      return <button className="button is-danger level-left blue-text button-left" onClick={() => deleteFavourite(spotId)}>X</button>
    } else {
      if (!spot.authorized) {
        return <div className="red">Request pending approval</div>
      }
      return <div className="green">This spot has been approved</div>
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


  function checkEmpty(boolean) {
    if (boolean && favs.length === 0) {
      return <Link className="subtitle grey hvr-grow" to="/spots">Go add some favourite places!</Link>
    } else if (!boolean && spotsMade.length === 0) return <Link className="subtitle grey" to="/newspot">No spots created yet - go add one!</Link>
  }

  function isAdmin() {
    if (name === 'admin') {
      return 'To be Authorized:'
    }
  }

  return (
    <div className="container has-text-centered">
      <div className="title username">{name}</div>
      <div className="container picture">
        <img className="profileImg" src={!picture ? 'https://www.driverhire.co.uk/wp-content/themes/driver-hire/img/placeholder-person.jpeg' : picture}></img>
        <form className='form' onSubmit={e => handleSubmit(e)}>
          <div className='field'>
            <label className='label uploadText'>Upload A New Profile Picture</label>
            <input
              onChange={e => handleInput(e)}
              type="text"
              className="input profileInput"
              value={picture.profilePicture}
            />
            <button className="button picButton">Upload</button>
          </div>
        </form>
      </div>
      <div className="title favTitle"> Your Favourite Places: </div>
      <div className="columns is-mobile is-multiline is-centered">
        {spots.map((spot, id) => {
          if (favs.includes(spot._id)) {
            return SpotCard(spot, id, spot._id, true, true)
          }
        })}
        {checkEmpty(true)}
      </div>
      <div className="title">{isAdmin()}</div>
      <div className="columns is-mobile is-multiline">
        {spots.map((spot, id, ) => {
          if (name === 'admin' && auth.includes(spot._id)) {
            return SpotCard(spot, id, spot._id, false, true)
          }
        })}
      </div>
      <div className="title favTitle"> Surf Spots you've created</div>
      <div className="columns is-mobile is-multiline is-centered">
        {checkEmpty(false)}
        {spotsMade.map((spot, id, ) => {
          return SpotCard(spot, id, spot._id, false, false)
        })}
      </div>
    </div>

  )

}



export default Profile

