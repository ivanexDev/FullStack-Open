/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import Country from "./Country"

const CountriesList = ({showedCountrie}) => {
    const [countrie, setCountrie] = useState(null)

    const handleCountrie = (countrie)=>{
          axios
            .get(`https://restcountries.com/v3.1/name/${countrie.name.common}`)
            .then(res=> setCountrie(res.data))
    }
  return (<>
    {countrie ? <Country countrie={countrie[0]}/>
              : showedCountrie.map((countrie)=> {
                return (
                <div key={countrie.name.common}>
                    <span key={countrie.name.common}>{countrie.name.common}</span> 
                    <span>
                        <button onClick={()=>handleCountrie(countrie)}>show</button>
                    </span>
                </div>)
                })
    }
  </>
  )
}

export default CountriesList