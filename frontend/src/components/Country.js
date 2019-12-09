import React, { useState, useEffect } from 'react'
import SpotCard from './SpotCard'

const CountrySpots = (props) => {

  const [data, setData] = useState([])
  const [countries, setCountry] = useState([])

  useEffect(() => {
    fetch('/api/spots')
      .then(resp => resp.json())
      .then(resp => {
        setData(resp),
        getCountry(resp)
      })
    return () => console.log('Unmounting component')
  }, [])


  function getCountry(data) {
    const currentCountry = props.match.params.country
    const filteredData = data.filter(spot => {
      return spot.country.toLowerCase() === currentCountry
    })
    setCountry(filteredData)
  }

  return (
    <section className="section">
      <div className="title" id="country-title">{props.match.params.country}</div>
      <div className="container">
        <div className="columns is-mobile is-multiline">
          {countries.map((spot, id) => {
            return <SpotCard key={id} spot={spot} />
          })}
        </div>
      </div>

    </section>
  )


}
export default CountrySpots