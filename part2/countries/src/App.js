import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Components/Country'

const Filter = ({value, filterHandler}) => {
  return (
    <input value={value} onChange={filterHandler} />
  )
}

const DisplayResults = ({results}) => {
  if (results.length > 10)
    return ( 'Too many matches. Please narrow your search further.' )
  else if (results.length > 1) {
    return (
      results.map( (country) => (
        <div key={country.name.common}>{country.name.common}</div>
      ))
    )
  }
  else if (results.length === 1)
    return ( <Country countryData={results[0]} /> )
  else
    return ( 'No results found.' )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter( country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )

  return (
    <div>
      <h2>Find Countries</h2>
      <div>
        <Filter value={newFilter} filterHandler={handleFilterChange} />
      </div>
      <h2>Results</h2>
      <div>
        <DisplayResults results={countriesToShow} />
      </div>
    </div>
  )
}

export default App
