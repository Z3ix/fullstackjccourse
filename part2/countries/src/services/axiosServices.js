import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY;
const urlAll = "https://studies.cs.helsinki.fi/restcountries/api/all"
const urlByName = "https://studies.cs.helsinki.fi/restcountries/api/name/"
const urlWeather = "https://api.open-meteo.com/v1/forecast?"; 

const getList = () => 
        axios
        .get(urlAll)
        .then((response) => response.data)



const getCountry = (country) =>
        axios
        .get(urlByName+country)
        .then((response) => response.data)

const getWeather = (latlng) =>
        axios
        .get(`${urlWeather}latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,cloud_cover,wind_speed_10m`)
        .then((response) => response.data )

export default {getList, getCountry, getWeather}