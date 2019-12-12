import React, { useState, useEffect } from 'react'
import SpotCard from './SpotCard'
import LazyHero from 'react-lazy-hero'

const CountrySpots = (props) => {
  const [data, setData] = useState([])
  const [countries, setCountry] = useState([])
  const [filterType, setFilterType] = useState('All')
  const [filterRating, setfilterRating] = useState('All')
  const [filter, setFilter] = useState('')

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

  const formFilter = (e) => setFilter(e.target.value)

  const levelFilter = (e) => {
    e.preventDefault()
    setFilterType(e.target.value)
  }

  const ratingFilter = (e) => {
    e.preventDefault()
    setfilterRating(e.target.value)
  }

  return (
    <div>
      <LazyHero imageSrc="https://images.unsplash.com/photo-1455729552865-3658a5d39692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" minHeight='40vh' parallaxOffset={100} overflow='hidden' opacity={0} transitionDuration={0} id='country-image'>
        <div>
          <div className="title" id="country-title">{props.match.params.country}</div>
        </div>
      </LazyHero>
      <section className="section">
        <form className="form" >
          {/* <form className="form" onClick={(e) => this.handleFilter(e)}> */}
          <div id='dropdowns'>
            <div className="field">
              <div className="control">
                <label className="label">Select your level:</label>
                <div className="select is-small">
                  <select onChange={(e) => levelFilter(e)}>
                    <option value="All">All</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All levels">All levels</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">User Rating:</label>
                <div className="select is-small">
                  <select onChange={(e) => ratingFilter(e)}>
                    <option value="All">All</option>
                    <option value="1">⭐️</option>
                    <option value="2">⭐️⭐️</option>
                    <option value="3">⭐️⭐️⭐️</option>
                    <option value="4">⭐️⭐️⭐️⭐️</option>
                    <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <input
            className="input"
            type="text"
            id='search-input'
            placeholder='Search...'
            name='query'
            onChange={formFilter.bind(this)}
          />
        </form>
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {countries
              .filter(elem => {
                if (filterType === "All") {
                  return elem
                } else return elem.level === filterType
              })
              .filter(elem => {
                return elem.spotName.toLowerCase().includes(filter.toLowerCase())
              })
              .map((spot, id) => {
                return <SpotCard key={id} spot={spot} />                 //   =>>>>>>>>> ADD message for no results found
              })}
          </div>
        </div>

      </section>
    </div>
  )


}
export default CountrySpots