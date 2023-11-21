/* eslint-disable react/prop-types */

const Filter = ({filter, setFilter}) => {
  return (
    <div>filter show with <input value={filter} onChange={({target})=>setFilter(target.value)} type="text" /></div>
  )
}

export default Filter