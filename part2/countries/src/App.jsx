import { useState, useEffect } from 'react'
import axiosServices from './services/axiosServices'


const countriesLimit = 10;

const SearchCountry = ({findCountry, findCountryChange}) => {
  return (
    <div>
      Find country 
      <input value={findCountry} onChange={findCountryChange}></input>
    </div>
)}

const CountryDetails = ({data}) => {
  if (data !== null) {
    return(
      <>
      <h1>{data.name.official}</h1>
      <div>Capital {data.capital}</div>
      <div>Area {data.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(data.languages).map((item)=><li key= {item}>{item}</li>)}
      </ul>
      <img src = {data.flags.png}/>
      </>
    )
  }
}

const Weather = ({data}) => {
  if (data !== null) {
    return(
      <>
        <div>Temperature {data.current.temperature_2m} {data.current_units.temperature_2m}</div>
        <div>Cloud cover {data.current.cloud_cover} {data.current_units.cloud_cover}</div>
        <div>Wind speed {data.current.wind_speed_10m} {data.current_units.wind_speed_10m} </div>
      </>
    )
  }
}



const SearchList = ({list,showCounty}) => { 
  if (list.length >= countriesLimit){
    return <div>Too many maches specify.</div>
  } else if (list.length > 1){
    return list.map((item)=><div key={item}>{item}<button onClick={()=>showCounty(item)}>show</button></div>)
  }
}



function App() {
  const [findCountry, setFindCountry] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [weather, setWeather] = useState(null);


  let foundList = findCountry == ''?[]:countryList.filter((e)=> e.toLowerCase().includes(findCountry.toLowerCase()));
  let single = foundList.filter((item) => item.toLowerCase() == findCountry.toLowerCase());


  if (single.length > 0 && countryData == null){ 
    axiosServices
      .getCountry(single)
      .then( data => {
        console.log(data);
        setCountryData (data);
      })
  } else if (foundList.length == 1 && countryData == null) {
    axiosServices
      .getCountry(foundList)
      .then( data => {
        console.log(data);
        setCountryData (data);
      })
  } else if (findCountry == '' && countryData !== null) {
      console.log('Nullfying!')
      setCountryData (null);
      setWeather(null);
  }

  if (countryData !== null && weather == null ){
      axiosServices
        .getWeather(countryData.latlng)
        .then(data => {
          console.log('WEATHER DATA')
          console.log(data)
          setWeather(data)
        })
  }

  console.log('foundlist');
  console.log(foundList);
  console.log(countryList);

  useEffect( ()=> {
    axiosServices
    .getList()
    .then( data => {
      console.log(data);
      setCountryList(data.map((country)=> country.name.common));
      
    })
  },[]);



  function findCountryChangeHandler(e){
    console.log(e.target.value);
    setFindCountry(e.target.value);
  }

  function showCountyHandler(item) {
    axiosServices
      .getCountry(item)
      .then( data => {
        console.log(data);
        setCountryData (data);
      })
  }
  console.log('Endscript. Rendering')
  return (
    <>
      <SearchCountry findCountry = {findCountry} findCountryChange ={findCountryChangeHandler}/>
      <SearchList list ={foundList} showCounty= {showCountyHandler} />
      <CountryDetails data = {countryData}/>
      <Weather data = {weather} />

    </>
  )
}

export default App
