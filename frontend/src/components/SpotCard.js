import React from 'react'
import { Link } from 'react-router-dom'

const SpotCard = ({ spot }) => (
  <div className="column is-one-third-desktop is-one-third-tablet is-full-mobile">
    <div className="card">
      <div className="card-image">
        <figure className="image is-5by3">
          <img src={spot.image} alt="Placeholder image"/>
        </figure>
      </div>
      <div className="card-content">
        <Link className="subtitle" to={`/spots/${spot._id}`}>{spot.spotName}</Link>
        <p className="has-text-grey-darker">{spot.region}</p>
      </div>
    </div>
  </div>
)

export default SpotCard