import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import SpotForm from './SpotForm'

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

const EditSpot = (props) => {

  const [form, updateForm] = useState(spotInitialState)
  const [error, setError] = useState(errorInitialState)

  useEffect(() => {
    axios.get(`/api/spots/${props.match.params.id}`)
      .then(resp => updateForm(resp.data))
      .catch(err => setError({ errors: err.response.status }))
  }, [])

  function handleInput(e) {
    updateForm({ ...form, [e.target.name]: e.target.value })
    setError({ ...error, errors: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('api/spots', form, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => history.push(`spots/${resp.data.id}`))
      .catch((err) => setError({ errors: err.response.data }))
  }

  return (
    <section className='section'>
      <div className='container'>
        <div className='title'>Edit Surf Spot</div>
        <SpotForm 
          handleSubmit={e => handleSubmit(e)}
          handleInput={e => handleInput(e)}
          error={error}
          form={form}
        />
      </div>
    </section>


  )




}


export default EditSpot