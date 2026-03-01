import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName]= useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

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