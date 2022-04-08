'use strict';

class Bill {
  constructor(currency, expirationDate, isActive, lastActiveDate, balance, limit) {
    this.currency = currency;
    this.expirationDate = expirationDate;
    this.isActive = isActive;
    this.lastActiveDate = lastActiveDate;
    this.balance = balance;
    this.limit = limit || null;
  }
}

class Client {
  constructor(fullName, isActive, id) {
    this.fullName = fullName;
    this.isActive = isActive;
    this.id = id;
    this.joinDate = new Date();
    this.creditBills = [];
    this.debetBills = [];
  }

  addDebetBill(currency, expirationDate, isActive, lastActiveDate, balance) {

    if (typeof currency !== 'string' || typeof expirationDate !== 'string' ||
      typeof isActive !== 'boolean' || typeof lastActiveDate !== 'string' ||
      typeof balance !== 'number') {

      throw new Error('Input data\'s in "Debet bill" were wrong');
    }

    this.debetBills.push(new Bill(currency, expirationDate, isActive, lastActiveDate, balance));
  }

  addCreditBill(currency, expirationDate, isActive, lastActiveDate, balance, limit) {

    if (typeof currency !== 'string' || typeof expirationDate !== 'string' ||
      typeof isActive !== 'boolean' || typeof lastActiveDate !== 'string' ||
      typeof balance !== 'number' || typeof limit !== 'number') {

      throw new Error('Input data\'s in "Credit bill" were wrong');
    }

    this.creditBills.push(new Bill(currency, expirationDate, isActive, lastActiveDate, balance, limit));
  }
}

export class Bank {
  constructor() {
    this.counter = 0;
    this.clients = [];
  }

  addClient(fullName, isActive) {

    if (typeof fullName !== 'string' || typeof isActive !== 'boolean') {
      throw new Error('Input data\'s in "client" were wrong');
    }

    this.clients.push(new Client(fullName, isActive, this.counter++));
  }

  findClient(id) {

    if (typeof id !== 'number') {
      throw new Error('ID must be a number');
    }

    for (let client of this.clients) {
      if (client.id === id) {
        return client;
      }
    }
  }

  async calculateMoneyAmount() {
    let allMoney = 0;
    await this.requestExchangeRate().then(exchangeRates => {

      for (let client of this.clients) {

        for (let account of client.debetBills) {
          if (account.currency === 'USD') {
            allMoney += account.balance;
            continue;
          }
          let nationalValue = account.balance * exchangeRates[account.currency].sale;
          allMoney += nationalValue / exchangeRates['USD'].buy;
        }

        for (let account of client.creditBills) {

          let actualBalance = account.balance - account.limit;
          if (account.balance < account.limit) {
            actualBalance = account.limit - account.balance;
          }

          if (account.currency === 'USD') {
            allMoney += actualBalance;
            continue;
          }
          let nationalValue = actualBalance * exchangeRates[account.currency].sale;
          allMoney += nationalValue / exchangeRates['USD'].buy;
        }
      }
    });
    return allMoney;
  }

  async calculateDebtAmount() {
    let debtAmount = 0;
    await this.requestExchangeRate().then(exchangeRates => {
      for (let client of this.clients) {
        for (let account of client.creditBills) {
          debtAmount += this.countDebt(account, exchangeRates);
        }
      }
    });
    return debtAmount;
  }

  async calculateAccountTypeDebt(isActive) {

    if (typeof isActive !== 'boolean') {
      throw new Error('You have to use boolean type');
    }

    let debtAmount = 0;
    await this.requestExchangeRate().then(exchangeRates => {
      for (let client of this.clients) {
        if (client.isActive === isActive) {
          for (let account of client.creditBills) {
            debtAmount += this.countDebt(account, exchangeRates);
          }
        }
      }
    });
    return debtAmount;
  }

  countDebt(account, exchangeRates) {
    let result = 0;
    if (account.limit < account.balance) {
      return result;
    }

    let debt = account.limit - account.balance;
    if (account.currency === 'USD') {
      return result += debt;
    }
    let nationalValue = debt * exchangeRates[account.currency].sale;
    return result += nationalValue / exchangeRates['USD'].sale;
  }

  async requestExchangeRate() {
    let promise = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    let exchangeObject = await promise.json()

      .then(data => {
        const exchangeRates = {};
        for (let rate of data) {
          exchangeRates[rate.ccy] = rate;
        }
        if (!exchangeRates['UAH']) {
          exchangeRates['UAH'] = { sale: 1 };
        }
        return exchangeRates;
      })

      .catch(() => {
        throw new Error('Data download error');
      });
    return exchangeObject;
  }
}