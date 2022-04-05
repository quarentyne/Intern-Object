'use strict';

function renderBill(clientBill, place, client) {
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
  billBalance.style.width = '25%';
  billCurrent.append(billBalance);
  billBalance.innerHTML = 'Balance: ' + clientBill.balance;

  const billLimit = document.createElement('p');
  billLimit.style.width = '25%';
  billCurrent.append(billLimit);
  billLimit.innerHTML = 'Limit: ' + clientBill.limit;

  const billCurrency = document.createElement('p');
  billCurrency.style.width = '25%';
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

  billEdit.addEventListener('click', () => {
    const editBalance = document.createElement('input');
    const editLimit = document.createElement('input');
    const editCurrency = document.createElement('input');
    const editExpiration = document.createElement('input');
    editBalance.style.width = '30%';
    editLimit.style.width = '30%';
    editCurrency.style.width = '25%';
    editExpiration.style.width = '40%';
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

    editLimit.value = clientBill.limit;
    billLimit.innerHTML = 'Limit: ';
    billLimit.append(editLimit);

    editCurrency.value = clientBill.currency;
    billCurrency.innerHTML = 'Currency: ';
    billCurrency.append(editCurrency);

    editExpiration.value = clientBill.expirationDate;
    billExpiration.innerHTML = 'Expiration date: ';
    billExpiration.append(editExpiration);

    billIsActive.innerHTML = 'Bill is ';
    billIsActive.append(editBalanceActive);

    billEdit.addEventListener('click', () => {
      clientBill.bill = editBalance.value;
      clientBill.limit = editLimit.value;
      clientBill.currency = editCurrency.value;
      clientBill.expirationDate = editExpiration.value;

      if (editBalanceActive.value === 'true') {
        clientBill.isActive = true;
      } else {
        clientBill.isActive = false;
      }

      mainContent.innerHTML = '';
      renderMainContent(bank.clients);
    })
  })

  billDelete.addEventListener('click', () => {
    for (let i = 0; i < client.debetBills.length; i++) {
      if (client.debetBills[i] === clientBill) {
        client.debetBills.splice(i, 1);
        mainContent.innerHTML = '';
        renderMainContent(bank.clients);
        return;
      }
    }

    for (let i = 0; i < client.creditBills.length; i++) {
      if (client.creditBills[i] === clientBill) {
        client.creditBills.splice(i, 1);
        mainContent.innerHTML = '';
        renderMainContent(bank.clients);
        return;
      }
    }
  })
}