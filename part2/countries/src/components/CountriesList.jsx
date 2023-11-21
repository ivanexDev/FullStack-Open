/* eslint-disable react/prop-types */

const CountriesList = ({showedCountrie}) => {
  return (<>
    {showedCountrie.map((countrie)=> <p key={countrie.name.common}>{countrie.name.common}</p>)}
  </>
  )
}

export default CountriesList