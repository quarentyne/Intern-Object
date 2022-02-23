'use strict';

const bank = [];

class Client{
  constructor(fullName, isActive) {
    this.fullName = fullName;
    this.isActive = isActive;
    this.joinDate = new Date();
    this.creditAccounts = [];
    this.debetAccounts = [];
    this.id = Client.count++;
  }
}
Client.count = 0;

function createNewClient(fullName, isActive) {
  let client = new Client(fullName, isActive);
  bank[client.id] = client;
}

function addAccount(id, currency, expirationDate, isActive, lastActiveDate, balance, limit) {
  if (balance < 0 || limit < 0) {
    throw new Error('Balance or limit couldn\'t be negative');
  }
  if (id < 0) {
    throw new Error('Invalid id was passed');
  }

  const accountData = {
    currency: currency,
    balance: balance,
    expirationDate: expirationDate,
    isActive: isActive,
    lastActiveDate: lastActiveDate,
    limit: limit,
  }

  if (limit) {
    return bank[id].creditAccounts.push(accountData);
  }
  return bank[id].debetAccounts.push(accountData);
}

async function requestExchangeRate() {
  let promise = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  let exchangeObject = await promise.json()
    
    .then(data => {
      const exchangeRates = {};
      for (let rate of data) {
        exchangeRates[rate.ccy] = rate;
      }
      if (!exchangeRates['UAH']) {
        exchangeRates['UAH'] = { sale: '1' };
      }
      return exchangeRates;
    })

    .catch(() => {
      throw new Error('Data download error');
    });
  return exchangeObject;
}

async function countAllMoney() {
  let allMoney = 0;
  await requestExchangeRate().then(exchangeRates => {

    for (let client of bank) {
      if (client.debetAccounts.length > 0) {

        for(let account of client.debetAccounts){
          if (account.currency === 'USD') {
            allMoney += account.balance;
            continue;
          }
          let nationalValue = account.balance * exchangeRates[account.currency].sale;
          allMoney += nationalValue / exchangeRates['USD'].buy;
        }
      }

      if (client.creditAccounts.length > 0) {
        for(let account of client.creditAccounts){

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
    }
  });
  return allMoney;
}

function countDebt(account, exchangeRates) {
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


async function findCustomersDebt(isActiveAccount) {
  let debtAmount = 0;
  await requestExchangeRate().then(exchangeRates => {
    for (let client of bank) {
      if (client.isActive === isActiveAccount) {
        if (client.creditAccounts.length > 0) {
          for(let account of client.creditAccounts){
            debtAmount += countDebt(account, exchangeRates);
          }
        }
      }
    }
  });
  return debtAmount;
}