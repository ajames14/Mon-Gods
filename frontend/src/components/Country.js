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
          <option value="All levels">All levels</option>
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
              } else return elem.level === filterType
            })
            // .filter(elem => {
            //   if (filterRating === "All") {                            ===============>  THIS IS TO FILTER OUT THE RATING
            //     return elem
            //   } else  {
            //     let average = (elem.rating.reduce((previous, current) => current += previous)/elem.rating.length)
            //     if(average <= filterRating && average > filterRating -1) {
            //       return elem
            //     }
            //   } 
            // })
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