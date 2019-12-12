import React, { useState, useEffect } from 'react'
import SpotCard from './SpotCard'

const Spots = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/spots')
      .then(resp => resp.json())
      .then(resp => setData(resp))
    return () => console.log('Unmounting component')
  }, [])
  console.log(data)

  return (
    <section className="section">
      <div className="title">Surf Spots</div>
      <div className="container">
        <div className="columns is-mobile is-multiline">
          {data.map((spot, id) => {
            if (spot.authorized !== false) {
              return <SpotCard key={id} spot={spot} />
            }
          })}
        </div>
      </div>

    </section>
  )
}


export default Spots