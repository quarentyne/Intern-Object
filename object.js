'use strict';

class Client{
  constructor(surname, name, patronymic, isActive) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.isActive = isActive;
  }
}
let Igor = new Client('Ivanov', 'Ivan', 'Petrovich', true)
console.log(Igor);