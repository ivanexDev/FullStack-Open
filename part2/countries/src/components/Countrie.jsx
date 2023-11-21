/* eslint-disable react/prop-types */
const Countrie = ({countrie}) => {
    const {name, capital,population, languages, flags } = countrie

    const allLanguages = Object.values(languages)
    const flag = Object.values(flags)[0]
    const alt = `Flag of ${name.common}`

  return (
    <>
    <h2>{name.common}</h2>
    <p>Capital {capital}</p>
    <p>Population {population}</p>

    <h3>Languages</h3>
    <ul>
        {allLanguages.map((lang)=><li key={lang}>{lang}</li>)}
    </ul>
    <img src={flag} alt={alt} />
    </>
  )
}

export default Countrie