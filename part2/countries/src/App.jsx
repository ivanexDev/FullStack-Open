import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import Countrie from './components/Countrie'
import CountriesList from './components/countriesList'
import './App.css'
import FindCountrie from './components/FindCountrie'

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountrie, setSearchedCoutrie] = useState("")

  useEffect(()=>{
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(({data})=>{
        setCountries(data)})
  },[])

  const filteredCountries = countries.filter((countrie)=> countrie.name.common.toLowerCase().includes(searchedCountrie))
  const showedCountrie = searchedCountrie.length > 0 ? filteredCountries : []


  return (
    <>
      <FindCountrie searchedCountrie={searchedCountrie} setSearchedCoutrie={setSearchedCoutrie}/>
      <div>
        {showedCountrie.length > 10   ? <p>Too many matches, specify another filter</p> : 
         showedCountrie.length === 1  ? <Countrie countrie={showedCountrie[0]}/> 
                                      : <CountriesList showedCountrie={showedCountrie}/>}
      </div>
    </>
  )
}

export default App
