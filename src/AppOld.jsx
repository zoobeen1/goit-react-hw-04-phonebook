import { Component } from 'react';
import { nanoid } from 'nanoid';
import { InputForm } from './components/InputForm';
import { Container } from './components/common';
import { Contacts } from './components/Contacts';
import { Filter } from './components/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    //Считываем контакты из localstorage
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    //Обновляем localstorage только если изменился стэйт
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  //Вызывается при отправке формы - возвращает буль от которого зависит сброс формы
  //Буль необходим для реализации проверки дублирующихся записей
  handleSubmit = values => {
    const name = values.name;
    const names = this.state.contacts.map(contact => contact.name);

    if (!names.includes(name)) {
      const newContact = {
        name,
        id: nanoid(),
        number: values.number,
      };
      this.setState({
        contacts: [...this.state.contacts, newContact],
      });
      return true; //Буль нужен!!! :) Смотреть выше
    }
    alert(`${name} is already in contacts`);
    return false; //Буль нужен!!! :)
  };

  //Удаляет контакт по его id
  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  //Управляет фильтром - контроллируемый элемент
  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  //Возвращает массив контактов по фильтру
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const lowercaseFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(lowercaseFilter);
    });
  };

  // *************************************************************************
  render() {
    //Деструктуризация объекта из state
    const { filter } = this.state;

    return (
      <Container>
        <h2>Phonebook</h2>
        <InputForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <Contacts
          contacts={this.getVisibleContacts()}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
