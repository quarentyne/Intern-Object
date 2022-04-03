'use strict';

function renderBill(clientBill, place) {
  const bill = document.createElement('div');
  bill.style.width = '95%';
  bill.style.paddingLeft = '5px';
  bill.style.paddingRight = '5px';
  bill.style.border = 'solid black 2px'
  place.append(bill);

  const billCurrent = document.createElement('div');
  bill.append(billCurrent);
  billCurrent.style.display = 'flex';
  billCurrent.style.justifyContent = 'space-between';

  const billBalance = document.createElement('p');
  billCurrent.append(billBalance);
  billBalance.innerHTML = 'Balance: ' + clientBill.balance;

  const billLimit = document.createElement('p');
  billCurrent.append(billLimit);
  billLimit.innerHTML = 'Limit: ' + clientBill.limit;

  const billCurrency = document.createElement('p');
  billCurrent.append(billCurrency);
  billCurrency.innerHTML = 'Currency: ' + clientBill.currency;

  const billExpiration = document.createElement('p');
  billExpiration.innerHTML = 'Expiration date: ' + clientBill.expirationDate;
  bill.append(billExpiration);

  const billFooter = document.createElement('div');
  bill.append(billFooter);
  billFooter.style.display = 'flex';
  billFooter.style.justifyContent = 'space-between';

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
  bill.append(billControl);
  billControl.style.display = 'flex';
  billControl.style.justifyContent = 'space-between';

  const billEdit = document.createElement('button');
  billEdit.innerHTML = 'Edit';
  billControl.append(billEdit);

  const billDelete = document.createElement('button');
  billDelete.innerHTML = 'Delete';
  billControl.append(billDelete);
}