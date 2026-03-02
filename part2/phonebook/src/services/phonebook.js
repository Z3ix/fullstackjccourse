import axios from 'axios'
const url = "http://localhost:3001/persons";

const getAll = () => {
    return axios 
        .get(url)
        .then(response => response.data)

}

const add = newObj => {
    return axios
      .post(url, newObj)
      .then(response => response.data)
}

const remove = id => {
    return axios
        .delete(`${url}/${id}`)
        .then(response => response.data)
}

const update = newObj =>{
    return axios
        .put(`${url}/${newObj.id}`,newObj)
        .then(response => response.data)
}
export default {getAll, add, remove, update}