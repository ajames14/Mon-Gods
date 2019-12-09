import React, { useState, useEffect } from 'react'
import { DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Link } from 'react-router-dom'



const CountrySearch = () => {

  const [data, setData] = useState([])
  const [spotFilter, setFilter] = useState('')

  //create an array of all available countries 
  const [countriesArr, setCountriesArr] = useState([])
  useEffect(() => {
    fetch('/api/spots')
      .then(resp => resp.json())
      .then(resp => {
        setData(resp),
          getUnique(resp)
      })
    return () => console.log('Unmounting component')
  }, [])

  function getUnique(data) {
    let countries = []
    data.map((elem) => { countries.push(elem.country) })
    console.log('COUNTRIES', countries)
    let unique = [...new Set(countries)]
    console.log(unique)
    setCountriesArr(unique)
    console.log('unique countriesArr11111', countriesArr)
  }
  console.log('unique countriesArr2', countriesArr)
  const filter = (e) => {
    setFilter(e.target.value)
    console.log('filter is', spotFilter)
  }
  return (
    <Element name="test1" className="element" >
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            id='search-input'
            placeholder='Search...'
            name='query'
            onChange={filter.bind(this)}
          />
        </div>
      </div>
      {countriesArr
        .filter(elem => {
          return elem.toLowerCase().includes(spotFilter.toLowerCase())
        })
        .map((country, i) => {
          return (
            <Link key={i} to={`/spots/countries/${country.toLowerCase()}`}>
              <li value={country}>{country}</li>
            </Link>
          )
        })
      }
    </Element>
  )
}
export default CountrySearch