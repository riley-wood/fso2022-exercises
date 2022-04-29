import { useState, useEffect } from 'react'
import entryService from './services/entries.js'
import Filter from './components/filter.js'
import Notification from './components/notification.js'
import PersonForm from './components/personform.js'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotification] = useState(null)
  const [errorMessage, setError] = useState(null)

  useEffect(() => {
    entryService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  
  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      entryService
        .remove(id)
        .then(() => {
          setPersons( persons.filter( a => a.id !== id) )
          setNotification(`${name} was successfully deleted from the server.`)
          setTimeout( () => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setError(`${name} has already been deleted from the server.`)
          setTimeout( () => {
            setError(null)
          }, 5000)
        })
    }
  }

  const addEntry = (event) => {
    event.preventDefault()

    if (!persons.some( element => ( element.name.toLowerCase() === newName.toLowerCase()))) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      entryService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification(`${response.name} was added successfully.`)
          setTimeout( () => {
            setNotification(null)
          }, 5000)
        }) 
    }
    else if (window.confirm(`${newName} is already added to the Phonebook. Replace the old number with a new one?`)) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      const index = persons.findIndex( element => element.name.toLowerCase() === newName.toLowerCase() )
      const id = persons[index].id

      entryService
        .update(id, nameObject)
        .then(response => {
          console.log(response)
          setPersons( persons.filter( a => a.id !== id).concat(response))
        })
      console.log("Already exists!")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter( person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

  const Persons = ({persons}) => {
    return (
      persons.map( (person) => ( 
        <div key={person.name}>
          {person.name} {person.number} <button onClick={(id) => deleteEntry(person.id, person.name)}>delete</button>
        </div>
      ))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notificationType='error' />
      <Notification message={notificationMessage} notificationType='success' />
      <div>
        filter: <Filter value={newFilter} filterHandler={handleFilterChange} />
      </div>
      <h2>Add New Entry</h2>
      <PersonForm submitHandler={addEntry} nameHandler={handleNameChange} numberHandler={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
