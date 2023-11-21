/* eslint-disable react/prop-types */

const FindCountrie = ({searchedCountrie, setSearchedCoutrie}) => {
  return (
    <div>Find countries <input type="text" value={searchedCountrie} onChange={({target})=>setSearchedCoutrie(target.value)} /></div>
  )
}

export default FindCountrie