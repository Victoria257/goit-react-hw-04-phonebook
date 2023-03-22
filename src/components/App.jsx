import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Form } from 'components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import FilterContacts from './FilterContacts/FilterContacts';

function App() {
  const { contacts, setContacts } = useState([]);
  const { filter, setFilter } = useState('');

  useEffect(() => {
    if (!contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      const contactsList = JSON.parse(localStorage.getItem('contacts'));
      contactsList && setContacts(contactsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    console.log(data);
  };

  const addContacts = ({ name, number }) => {
    const contact = {
      id: nanoid(7),
      name,
      number,
    };

    const theSameName = this.state.contacts.find(
      prevContact => prevContact.name === contact.name
    );
    if (theSameName) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  const delContact = contactId => {
    setContacts(prevState.contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <Form
        onSubmit={formSubmitHandler}
        addContacts={addContacts}
        contacts={contacts}
      />
      <ContactList contacts={getVisibleContacts()} delContact={delContact}>
        <FilterContacts filter={filter} onChange={changeFilter} />
      </ContactList>
    </div>
  );
}

export default App;
