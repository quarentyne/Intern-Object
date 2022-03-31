'use strict';

const bill = document.createElement('div');
bill.style.maxWidth = '200px';
bill.style.paddingLeft = '5px';
bill.style.paddingRight = '5px';
bill.style.border = 'solid black 2px'
document.body.append(bill);

const billCurrent = document.createElement('div');
bill.append(billCurrent);
billCurrent.style.display = 'flex';
billCurrent.style.justifyContent = 'space-between';

const billBalance = document.createElement('p');
billCurrent.append(billBalance);
billBalance.innerHTML = 'Balance';

const billLimit = document.createElement('p');
billCurrent.append(billLimit);
billLimit.innerHTML = 'Limit';

const billCurrency = document.createElement('p');
billCurrent.append(billCurrency);
billCurrency.innerHTML = 'Currency';

const billExpiration = document.createElement('p');
billExpiration.innerHTML = 'Expiration';
bill.append(billExpiration);

const billFooter = document.createElement('div');
bill.append(billFooter);
billFooter.style.display = 'flex';
billFooter.style.justifyContent = 'space-between';

const billLastActive = document.createElement('p');
billFooter.append(billLastActive);
billLastActive.innerHTML = 'Last Active';

const billIsActive = document.createElement('p');
billFooter.append(billIsActive);
billIsActive.innerHTML = 'Active';

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