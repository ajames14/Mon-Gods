import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

const commentInitialState = {
  text: ''
}

const errorInitialState = {
  errors: ''
}

const Comments = ({ data, updateComments }) => {

  const [comment, setComment] = useState('')


  const [error, setError] = useState('')

  function handleInput(e) {
    setComment({ ...comment, text: e.target.value })
    console.log(comment)
    setError({ ...error, errors: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!comment) return
    axios.post(`/api/spots/${data._id}/comments`, comment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => updateComments(resp))
      .then(() => setComment({ ...comment, text: '' }))
      .catch((err) => setError({ errors: err.response.data }))
  }

  

  if (!data.comments) {
    return <h1>... Loading</h1>
  }
  return (
    <div>
      <div>
        {data.comments.map((elem, i) => {
          return (
            <article className="media" key={i}>
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
          <strong>{elem.user.username}</strong>  <small>{timeStamp(elem)}</small>
                    <br />
                    {elem.text}
                  </p>
                </div>
              </div>
              <div className="media-right">
                <button className="delete"></button>
              </div>
            </article>
          )
        })}
      </div>
      <div>
        <form className='form' onSubmit={e => handleSubmit(e)}>
          <div className='field'>
            <label className='label'>Add a Comment</label>
            <input
              onChange={e => handleInput(e)}
              type="text"
              className="input"
              value={comment.text}
            />
          </div>
          <button >Submit Comment</button>
        </form>
      </div>
    </div>


  )




}


export default Comments