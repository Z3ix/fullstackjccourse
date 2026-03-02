import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'

const PersonField = (props) => <div>{props.person.name} {props.person.number}<button onClick ={props.removeEntry}>delete</button></div>

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
    phonebookServices
      .getAll()
      .then(persons => {
        console.log(persons)
        setPersons(persons)
      })
    
  },[])
  console.log(persons.length)
  
  function addContactHandler(e) {
    e.preventDefault();
    console.log(e);
    let findPerson =  persons.find((person)=>person.name === newName);
    if (findPerson){
      if (confirm(`${newName} is already added to phonebook, do you want to update number?`)){
        phonebookServices
          .update({name: findPerson.name, number: newNumber, id: findPerson.id})
          .then((response)=>{
            let newPersons = [...persons];
            newPersons[newPersons.indexOf(findPerson)] = response;
            setPersons(newPersons);
            setNewName('');
            setNewNumber('');
          })
      }
      return;
    }
    let newPerson = {name: newName, number: newNumber};
    console.log(newPerson);
    phonebookServices
      .add(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      })

  }

  function removeEntry(person){
    if(confirm(`Do you want to delete ${person.name} from phonebook?`)){
      phonebookServices
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter((person)=>person.id != response.id))
        })
        .catch(()=>alert(`An error occured`))
    }
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
          .map((person) => <PersonField person ={person} key ={person.name} removeEntry={()=>removeEntry(person)}/>)
      }

    </div>
  )
}

export default App

/*      {
        persons
          .filter((person) => person.name.includes(filterName )|| filterName =='')
          .map((person) => <PersonField person ={person} key ={person.name}/>)
          */