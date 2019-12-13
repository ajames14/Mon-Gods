import React from 'react'
import { Link } from 'react-router-dom'

function string(spot) {
  const shorter = spot.description.substring(0, 135) + '...'
  return shorter
}

const SpotCard = ({ spot }) => (
  <div className="column is-half-desktop is-one-third-tablet is-full-mobile">
    <div className="card has-text-centered hvr-grow">
      <Link to={`/spots/${spot._id}`}>
        <div className="card-image">
          <figure className="image is-5by3 large-img">
            <img src={spot.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content all-text">
          <div className="subtitle name  blue-text" to={`/spots/${spot._id}`}>{spot.spotName}</div>
          <p className="region blue-text">{spot.region}</p>
          <p className="description">{string(spot)}</p>
        </div>
      </Link>
    </div>
  </div>
)

export default SpotCard