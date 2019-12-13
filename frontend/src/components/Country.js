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

  console.log('TESSSSTTTTTTYYYYYYYYYY', data)

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
    <div className="spotCard-background">
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
              <div className="control filters">
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
              <div className="control filters">
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

            <div className="control filters">
              <label className="label">Search Spots:</label>
              <input
                className="input is-hovered is-small"
                type="text"
                id='search-input'
                placeholder='Search...'
                name='query'
                onChange={formFilter.bind(this)}
              />
            </div>
          </div>
        </form>
        <br />
        <div id="spots-overview">
          <div className="container has-text-centered">
            <div className="columns is-mobile is-multiline">
              {countries
                .filter(elem => {
                  if (filterType === "All") {
                    return elem
                  } else return elem.level === filterType || elem.level === 'All levels'  // ===========> some spots are suitible for all levels
                })

                .filter(elem => {
                  let average
                  if (filterRating === "All") {                            // ===============>  THIS IS TO FILTER OUT THE RATING
                    return elem
                  } else {
                    if (elem.rating.length === 0) {
                      average = 0
                    } else {
                      average = (elem.rating.reduce((previous, current) => previous.rate + current.rate)) / elem.rating.length
                      console.log('average1111', average)
                    }
                    console.log('aveage222222', average)
                    // let average = (elem.rating.rate.reduce((previous, current) => current += previous)/elem.rating.rate.length)
                    if (average > Number(filterRating) && average <= Number(filterRating) + 1) {
                      // console.log('filterrrrrrrr RAAAATINGGGGGG', filterRating)
                      // console.log('++++++1', Number(filterRating) + 1)
                      // console.log('1-------', Number(filterRating) - 1)
                      return elem
                    }
                  }
                })

                .filter(elem => {
                  // if(this.state.filterType){
                  // return elem.type === this.state.filterType
                  return elem.spotName.toLowerCase().includes(filter.toLowerCase())
                  // || elem.region.toLowerCase().includes(filter.toLowerCase())      =>>>>>>>>> allows for form to also filter field also include spot's region
                })
                .map((spot, id) => {
                  return <SpotCard key={id} spot={spot} />                 //   =>>>>>>>>> ADD message for no results found
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )


}
export default CountrySpots