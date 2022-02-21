'use strict';

async function api() {
  let promise = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  let result = await promise.json();
  return result;
}

let result = api();
result.then(value => { console.log(value) }, value => { throw value });

const bank = [];

class Client{
  constructor(fullName, isActive) {
    this.fullName = fullName;
    this.isActive = isActive;
    this.joinDate = new Date();
    this.creditAccounts = [];
    this.debetAccounts = [];
    this.id = bank.length;
  }

  setDebetAccount(currency, balance, expirationDate, isActive, lastActiveDate) {
    if (balance < 0) {
      throw new Error('Account balance couldn\'t be negative');
    }
    this.debetAccounts.push({
      currency: currency,
      balance: balance,
      expirationDate: expirationDate,
      isActive: isActive,
      lastActiveDate: lastActiveDate,
    });
  }

  setCreditAccount(currency, balance, limit, expirationDate, isActive, lastActiveDate) {
    if (balance < 0 || limit < 0) {
      throw new Error('Balance or limit couldn\'t be negative');
    }
    this.creditAccounts.push({
      currency: currency,
      balance: balance,
      limit: limit,
      expirationDate: expirationDate,
      isActive: isActive,
      lastActiveDate: lastActiveDate,
    });
  }
}
let Petr = new Client('Petr Nikiforovich Muhin', true);
bank.push(Petr);
let Ivan = new Client('Ivan Petrovich Chushkin', true);
bank.push(Ivan)
Petr.setCreditAccount('USD', 10000, 5000, '20.01.2023', true, '21.02.2022');
Petr.setDebetAccount('UAH', 1200, '11.12.2024', true, '21.02.2022');
Ivan.setDebetAccount('EUR', 100, '09.09.2029', false, '02.08.2009');

