import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import SpotForm from './SpotForm'
import SurfMap from './SurfMap'

const spotInitialState = {
  spotName: '',
  lat: '',
  long: '',
  country: '',
  region: '',
  image: '',
  description: '',
  level: '',
  typeOfWave: ''
}

const errorInitialState = {
  errors: ''
}

const NewSpot = (props) => {

  const [form, updateForm] = useState(spotInitialState)

  const [error, setError] = useState(errorInitialState)

  function handleInput(e) {
    updateForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
    setError({ ...error, errors: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form) return
    axios.post('/api/spots', form, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => props.history.push(`/spots/${resp.data._id}`))
      .catch((err) => setError({ errors: err.response.data }))
  }

  return (
    <section className='section'>
      <div className='container'>
        <div className='title'>Share your Favourite Surf Spot</div>
        <SpotForm 
          handleSubmit={e => handleSubmit(e)}
          handleInput={e => handleInput(e)}
          error={error}
          form={form}
        />
      </div>
      <SurfMap />
    </section>


  )
}

export default NewSpot