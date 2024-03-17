import { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css"

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className='notification'>
      {message}
    </div>
  );
};

const Filter = ({ searchQuery, handleSearch }) => {
  return (
    <div>
      Search: <input value={searchQuery} onChange={handleSearch} />
    </div>
  );
};

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`);
      if (confirmUpdate) {
        axios.put(`http://localhost:3001/persons/${existingPerson.id}`, { ...existingPerson, number: newNumber })
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`${newName}'s number updated successfully.`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000); // 5 seconds notification
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      }
    } else {
      axios.post('http://localhost:3001/persons', { name: newName, number: newNumber })
        .then(response => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
          setNotificationMessage(`${newName} added to the phonebook.`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          console.error('Error adding new person:', error);
        });
    }
  };

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);
    const confirmDeletion = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDeletion) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} deletePerson={deletePerson} />

      <div>debug: {newName}</div>
    </div>
  );
};

const Numbers = ({ filteredPersons, deletePerson }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
