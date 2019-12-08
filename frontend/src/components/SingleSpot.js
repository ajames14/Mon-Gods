import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

const SingleSpot = (props) => {

  // const errorInitialState = {
  //   errors: ''
  // }

  const [data, setData] = useState([])
  const [rating, setRate] = useState(0)
  const [nums, setNum] = useState([])
  const [people, setPeople] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/spots/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => setData(resp))
      .then(createRating())
    return () => console.log('Unmounting component')
  }, [])

  let response = {}

  function createRating() {
    setNum([])
    fetch(`/api/spots/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => {
        response = resp
        setPeople(resp.rating.length)
        return resp.rating.forEach(e => {
          nums.push(e.rate)
          return nums
        })
      })
      .then(() => {
        if (nums.length > 0) {
          const added = nums.reduce((pre, i) => {
            return pre + i
          })
          return (added / (response.rating.length * 5))
        }
      })
      .then(resp => setRate(resp))
    return () => console.log('updated')
  }


  const con = (num) => {
    submitRating(num)
  }

  function submitRating(num) {
    console.log('submitted')
    axios.post(`/api/spots/${props.match.params.id}/rate`, { rate: num }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => createRating())
      .catch((err) => {
        if (err.response.data.message !== 'Unauthorized') {
          return setError(err.response.data.message)
        } else {
          setError('Unauthorized - please log in')
        }
      })
  }

  function checkRating() {
    if (isNaN(rating)) {
      return 0
    }
    return rating.toFixed(2)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-half-tablet">
            <p className="title">
              {data.spotName}
            </p>
            <p className="subtitle">
              {`${data.country} - ${data.region}`}
            </p>
            <p>
              {data.description}
            </p>
          </div>
          <div className="column is-half-tablet">
            <img src={data.image} />
          </div>
          <div>Rating: {checkRating()} / {checkRating() * 100}%
            <br />
            Or: {((checkRating()) * 5).toFixed(2)} stars
            <br />
            {people} people have rated
          </div>
        </div>
        <button className='is button' onClick={() => con(1)}>1</button>
        <button className='is button' onClick={() => con(2)}>2</button>
        <button className='is button' onClick={() => con(3)}>3</button>
        <button className='is button' onClick={() => con(4)}>4</button>
        <button className='is button' onClick={() => con(5)}>5</button>
        {error && <small className="help is-danger">
          {error}
        </small>}
      </div>
    </section>
  )
}

export default SingleSpot



  // function updateRating() {
  //   fetch(`/api/spots/${props.match.params.id}`)
  //     .then(resp => resp.json())
  //     .then(resp => {
  //       response = resp
  //     })
  //     .then(() => {
  //       console.log(nums)
  //       const added = nums.reduce((pre, i) => {
  //         return pre + i
  //       })
  //       console.log(added)
  //       return (added / (response.rating.length * 5))
  //     })
  //     .then(resp => setRate(resp))
  //   return () => console.log('updated')
  // }