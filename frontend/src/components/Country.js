import React, { useState, useEffect } from 'react'
import SpotCard from './SpotCard'

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
<<<<<<< HEAD
          getCountry(resp)

=======
        getCountry(resp)
>>>>>>> development
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
    console.log("TESSSSSTTTTYYY", filterType)
    // this.state.spells.map(e => { })
  }

  const ratingFilter = (e) => {
    e.preventDefault()
    setfilterRating(e.target.value)
    console.log("TESSSSSTTTTYYY", filterType)
    // this.state.spells.map(e => { })
  }

  return (
    <section className="section">
      <div className="title" id="country-title">{props.match.params.country}</div>
      <form className="form" >
        {/* <form className="form" onClick={(e) => this.handleFilter(e)}> */}
        <select onChange={(e) => levelFilter(e)}>
          <option value="All">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select onChange={(e) => ratingFilter(e)}>
          <option value="All">All</option>
          <option value="1">⭐️</option>
          <option value="2">⭐️⭐️</option>
          <option value="3">⭐️⭐️⭐️</option>
          <option value="4">⭐️⭐️⭐️⭐️</option>
          <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
        </select>
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

    </section>
  )


}
export default CountrySpots