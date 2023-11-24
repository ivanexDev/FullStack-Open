import axios from "axios"
const baserUrl = "http://localhost:3001/persons"

const getAll = ()=>{
    const request = axios.get(baserUrl)
    return request.then(res=> res.data)
}

const create = (newContact)=>{
    const request = axios.post(baserUrl, newContact)
    return request.then(res=>res.data)
}

const deleteContact = (id)=>{
    const request = axios.delete(`${baserUrl}/${id}`)
    return request.then(res=>res)
}


export default{
    getAll,
    create,
    deleteContact
}