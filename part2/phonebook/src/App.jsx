import { useState, useEffect } from 'react'
import axios from 'axios'

const PersonField = (props) => <div>{props.person.name} {props.person.number}</div>

const Search = ({onFilterChange,filterName}) => {
  return(
    <>
      <h3>Search contact</h3>
      <div>Find <input onChange={onFilterChange} value={filterName}/></div>
    </>
  )
}

const AddContactForm = ({nameChangeHandler, newName, numberChangeHandler, newNumber, addContactHandler}) =>{
  return(
    <>
      <h3>Add contact</h3>
      <form onSubmit={addContactHandler}>
        <div>
          name: <input onChange={nameChangeHandler} value={newName}/>
        </div>
        <div>
          number: <input onChange={numberChangeHandler} value={newNumber}/>
        </div>
        <div>
          <button type="add">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(()=>{
    axios
        .get('http://localhost:3001/persons')
        .then(response => setPersons(response.data))
  },[])
  console.log(persons.length)
  
  function addContactHandler(e) {
    e.preventDefault();
    console.log(e);
    if (persons.find((person)=>person.name === newName)){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    let newPersons = persons.concat({name: newName, number: newNumber});
    console.log(newPersons);
    setPersons(newPersons);
    setNewName('');
    setNewNumber('');
  }

  function nameChangeHandler(e){
    setNewName(e.target.value);
  }

  function numberChangeHandler(e){
    setNewNumber(e.target.value);
  }
  function filterChangeHandler(e){
    setFilterName(e.target.value);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Search onFilterChange={filterChangeHandler} filter={filterName}/>
      <AddContactForm nameChangeHandler={nameChangeHandler} newName={newName} numberChangeHandler={numberChangeHandler} newNumber={newNumber} addContactHandler={addContactHandler}/>
      <h2>Numbers</h2>
      {
        persons
          .filter((person) => person.name.includes(filterName )|| filterName =='')
          .map((person) => <PersonField person ={person} key ={person.name}/>)
      }
    </div>
  )
}

export default App