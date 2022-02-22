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
Client.count = 0;

let Petr = new Client('Petr Nikiforovich Muhin', true);
bank.push(Petr);
let Ivan = new Client('Ivan Petrovich Chushkin', true);
bank.push(Ivan);
Petr.setCreditAccount('USD', 10000, 5000, '20.01.2023', true, '21.02.2022');
Petr.setDebetAccount('USD', 1200, '11.12.2024', true, '21.02.2022');
Ivan.setDebetAccount('EUR', 100, '09.09.2029', false, '02.08.2009');
Ivan.setDebetAccount('RUR', 10100, '09.09.2029', false, '02.08.2009');
Ivan.setCreditAccount('UAH', 12000, 200000, '10.02.2022', false, '10.02.2022');
let Sergey = new Client('Sergey Pavlovich Mishkin', true);
Sergey.setCreditAccount('RUR', 120000, 100000, '09.09.2029', true, '02.02.2022');
bank.push(Sergey);
let Petrusha = new Client('Pet viktorovich Nagirin', false);
bank.push(Petrusha);
Petrusha.setCreditAccount('USD', 1200, 2000, '19.09.2029', false, '20.01.2019');


async function requestExchangeRate() {
  let promise = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(rate => rate.json())
    .then(data => {
      const exchangeRates = {
        'UAH': { sale: '1'},
      };
      for (let rate of data) {
        exchangeRates[rate.ccy] = rate;
      }
      return exchangeRates;
    })
    .catch(() => {
      throw new Error('Data download error');
    })
  return promise;
}

async function countAllMoney() {
  let allMoney = 0;
  await requestExchangeRate().then(exchangeRates => {
    for (let client of bank) {

      if (client.debetAccounts.length > 0) {
        client.debetAccounts.forEach(account => {
          if (account.currency === 'USD') {
            allMoney += account.balance;
          } else {
            let nationalValue = account.balance * exchangeRates[account.currency].sale;
            allMoney += nationalValue / exchangeRates['USD'].sale;
          }
        })
      }

      if (client.creditAccounts.length > 0) {
        client.creditAccounts.forEach(account => {

          let actualBalance = account.balance - account.limit;
          if (account.balance < account.limit) {
            actualBalance = account.limit - account.balance;
          } 

          if (account.currency === 'USD') {
            allMoney += actualBalance;
          } else {
            let nationalValue = actualBalance * exchangeRates[account.currency].sale;
            allMoney += nationalValue / exchangeRates['USD'].sale;
          }
        })
      }

    }
  })
  return allMoney;
}
// countAllMoney().then(value => console.log(value))

// async function findActiveCustomersDebt() {
//   let debtAmount = 0;
//   for (let client of bank) {
//     if (client.isActive) {
//       if (client.creditAccounts.length > 0) {
//         client.creditAccounts.forEach(account => {
//           if (account.currency === 'USD') {
//             debtAmount += account.balance;
//           } else {
            
//           }
//         })
//       }
//     }
//   }
// }