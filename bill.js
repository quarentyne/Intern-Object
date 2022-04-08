'use strict';

import { displayError, checkMoney, checkCurrency, checkDate } from "./checking.js";
import { renderMainContent, mainContent, errorPlace } from "./renderContent.js";

export function renderBill(clientBill, place, bills, bank) {
  const bill = document.createElement('div');
  bill.classList.add('bill');
  place.append(bill);

  const billCurrent = document.createElement('div');
  billCurrent.classList.add('bill__current');
  bill.append(billCurrent);

  const billBalance = document.createElement('p');
  billCurrent.append(billBalance);
  billBalance.innerHTML = 'Balance: ' + clientBill.balance;

  const billLimit = document.createElement('p');
  if (clientBill.limit !== null) {
    billCurrent.append(billLimit);
    billLimit.innerHTML = 'Limit: ' + clientBill.limit;
  }

  const billCurrency = document.createElement('p');
  billCurrent.append(billCurrency);
  billCurrency.innerHTML = 'Currency: ' + clientBill.currency;

  const billExpiration = document.createElement('p');
  billExpiration.innerHTML = 'Expiration date: ' + clientBill.expirationDate;
  bill.append(billExpiration);

  const billFooter = document.createElement('div');
  billFooter.classList.add('bill__footer');
  bill.append(billFooter);

  const billLastActive = document.createElement('p');
  billFooter.append(billLastActive);
  billLastActive.innerHTML = 'Last active was: ' + clientBill.lastActiveDate;

  const billIsActive = document.createElement('p');
  billFooter.append(billIsActive);
  if (clientBill.isActive) {
    billIsActive.innerHTML = 'Bill is Active';
  } else {
    billIsActive.innerHTML = 'Bill is Inactive';
  }

  const billControl = document.createElement('div');
  billControl.classList.add('control');
  bill.append(billControl);

  const billEdit = document.createElement('button');
  billEdit.innerHTML = 'Edit';
  billControl.append(billEdit);

  const billDelete = document.createElement('button');
  billDelete.innerHTML = 'Delete';
  billControl.append(billDelete);

  billEdit.addEventListener('click', () => {
    const editBalance = document.createElement('input');
    const editLimit = document.createElement('input');
    const editCurrency = document.createElement('input');
    const editExpiration = document.createElement('input');
    const editActivity = document.createElement('input');
    billEdit.innerHTML = 'Save';

    const editBalanceActive = document.createElement('select');
    const editBalanceIsActive = document.createElement("option");
    const editBalanceIsInactive = document.createElement("option");

    editBalanceIsActive.value = 'true';
    editBalanceIsActive.text = 'Active';
    editBalanceIsInactive.value = 'false';
    editBalanceIsInactive.text = 'Inactive';
    editBalanceActive.add(editBalanceIsActive);
    editBalanceActive.add(editBalanceIsInactive);

    editBalance.value = clientBill.balance;
    billBalance.innerHTML = 'Balance: ';
    billBalance.append(editBalance);

    if (clientBill.limit !== null) {
      editLimit.value = clientBill.limit;
      billLimit.innerHTML = 'Limit: ';
      billLimit.append(editLimit);
    }

    editCurrency.value = clientBill.currency;
    billCurrency.innerHTML = 'Currency: ';
    billCurrency.append(editCurrency);

    editExpiration.value = clientBill.expirationDate;
    billExpiration.innerHTML = 'Expiration date: ';
    billExpiration.append(editExpiration);

    editActivity.value = clientBill.lastActiveDate;
    billLastActive.innerHTML = 'Last active date: ';
    billLastActive.append(editActivity);

    billIsActive.innerHTML = 'Bill is ';
    billIsActive.append(editBalanceActive);

    billEdit.addEventListener('click', () => {
      if (clientBill.limit === null) {
        editLimit.value = 0;
      }
      if (!checkMoney.test(editBalance.value) || !checkMoney.test(editLimit.value)) {
        displayError('Balance or Limit', errorPlace);
        return;
      }
      if (!checkCurrency.test(editCurrency.value)) {
        displayError('Currency', errorPlace);
        return;
      }
      if (!checkDate.test(editActivity.value) || !checkDate.test(editExpiration.value)) {
        displayError('Date', errorPlace);
        return;
      }

      if (clientBill.limit !== null) {
        clientBill.limit = editLimit.value;
      }
      clientBill.bill = editBalance.value;
      clientBill.currency = editCurrency.value.toUpperCase();
      clientBill.expirationDate = editExpiration.value;
      clientBill.lastActiveDate = editActivity.value;

      if (editBalanceActive.value === 'true') {
        clientBill.isActive = true;
      } else {
        clientBill.isActive = false;
      }

      mainContent.innerHTML = '';
      renderMainContent(bank.clients, bank);
    })
  })

  billDelete.addEventListener('click', () => {
    for (let i = 0; i < bills.length; i++) {
      if (bills[i] === clientBill) {
        bills.splice(i, 1);
        mainContent.innerHTML = '';
        renderMainContent(bank.clients, bank);
        return;
      }
    }
  })
}