import axios from "axios"
const baserUrl = "/api/persons"

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

const updatePhone = (id,newPhone)=>{

    const request = axios.put(`${baserUrl}/${id}`, newPhone)
    return request.then(res=>res.data)
}


export default{
    getAll,
    create,
    deleteContact,
    updatePhone
}