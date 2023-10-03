import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { InputForm } from 'components/InputForm';
import { Container } from 'components/common';
import { Contacts } from 'components/Contacts';
import { Filter } from 'components/Filter';

export function App() {
  const templ = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? templ
  );
  const [filter, setFilter] = useState('');

  //Обновляем localstorage только если изменился стэйт contacts
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //Вызывается при отправке формы - возвращает буль от которого зависит сброс формы
  //Буль необходим для реализации проверки дублирующихся записей
  const handleSubmit = values => {
    const name = values.name;
    const names = contacts.map(contact => contact.name);
    console.log('Names: ', names);
    console.log('Name: ', name);

    if (!names.includes(name)) {
      const newContact = {
        name,
        id: nanoid(),
        number: values.number,
      };

      setContacts(prev => [...prev, newContact]);

      return true; //Буль нужен!!! :) Смотреть выше
    }
    alert(`${name} is already in contacts`);
    return false; //Буль нужен!!! :)
  };

  //Удаляет контакт по его id
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  //Управляет фильтром - контроллируемый элемент
  const changeFilter = e => {
    setFilter(e.target.value);
  };

  //Возвращает массив контактов по фильтру
  const getVisibleContacts = () => {
    const lowercaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowercaseFilter)
    );
  };

  // *************************************************************************

  return (
    <Container>
      <h2>Phonebook</h2>
      <InputForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <Contacts contacts={getVisibleContacts()} deleteContact={deleteContact} />
    </Container>
  );
}
