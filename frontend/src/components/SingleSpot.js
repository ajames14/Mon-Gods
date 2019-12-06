import React, { useState, useEffect } from 'react'

const SingleSpot = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`/api/spots/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => setData(resp))
    return () => console.log('Unmounting component')
  }, []) 

  console.log(props.match.params.id)
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
        </div>
      </div>
    </section>
  )
}

export default SingleSpot
