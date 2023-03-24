import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Form } from 'components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import FilterContacts from './FilterContacts/FilterContacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filterContact, setFilterContact] = useState('');

  // робочий варіант (якщо не хочеш писати в стейт, але трохи довший)
  // useEffect(() => {
  //   const contactsList = JSON.parse(localStorage.getItem('contacts'));
  //   if (contacts.length === 0) {
  //     contactsList && setContacts(contactsList);
  //   } else localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //це працює тільки локально
  // const contactsList = JSON.parse(localStorage.getItem('contacts'));
  // useEffect(() => {
  //   if (!contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   } else {
  //     contactsList && setContacts(contactsList);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const formSubmitHandler = data => {
    console.log(data);
  };

  const addContacts = ({ name, number }) => {
    const contact = {
      id: nanoid(7),
      name,
      number,
    };

    const theSameName = contacts.find(
      prevContact => prevContact.name === contact.name
    );
    if (theSameName) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevState => [contact, ...prevState]);
    }
  };

  const changeFilter = event => {
    setFilterContact(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filterContact.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  const delContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };
  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <Form
        onSubmit={formSubmitHandler}
        addContacts={addContacts}
        contacts={contacts}
      />
      <ContactList contacts={visibleContacts} delContact={delContact}>
        <FilterContacts filter={filterContact} onChange={changeFilter} />
      </ContactList>
    </div>
  );
}

export default App;
