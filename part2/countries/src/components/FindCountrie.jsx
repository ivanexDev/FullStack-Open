/* eslint-disable react/prop-types */

const FindCountrie = ({inputCountry, setInputCountry}) => {
  return (
    <div>Find countries <input type="text" value={inputCountry} onChange={({target})=>setInputCountry(target.value)} /></div>
  )
}

export default FindCountrie