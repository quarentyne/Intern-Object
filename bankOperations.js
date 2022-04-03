'use strict';

const operationBlock = document.createElement('div');
operationBlock.style.width = '100%';

const createClient = document.createElement('div');
createClient.style.display = 'flex';
createClient.style.flexDirection = 'column';
createClient.style.border = '1px solid black';
createClient.style.padding = '5px';
createClient.style.marginBottom = '20px';

const createClientDatas = document.createElement('div');
createClientDatas.style.display = 'flex';

const newClientName = document.createElement('input');
newClientName.style.width = '100%';
newClientName.placeholder = "ФИО";

const newClientIsActive = document.createElement('select');

const activeClient = document.createElement("option");
const inActiveClient = document.createElement("option");
activeClient.value = 'true';
activeClient.text = 'Active';
inActiveClient.value = 'false';
inActiveClient.text = 'Inactive';
newClientIsActive.add(activeClient);
newClientIsActive.add(inActiveClient);

const newClientButton = document.createElement('button');
newClientButton.innerHTML = 'Create new client';

const addBill = document.createElement('div');
addBill.style.display = 'flex';
addBill.style.flexDirection = 'column';
addBill.style.border = '1px solid black';
addBill.style.padding = '5px';
addBill.style.marginBottom = '20px';

const addBillID = document.createElement('input');
addBillID.placeholder = "Client ID";

const addBillType = document.createElement('select');

const addBillTypeDebet = document.createElement("option");
const addBillTypeCredit = document.createElement("option");
addBillTypeDebet.value = 'debet';
addBillTypeDebet.text = 'Debet bill';
addBillTypeCredit.value = 'credit';
addBillTypeCredit.text = 'Credit bill';
addBillType.add(addBillTypeDebet);
addBillType.add(addBillTypeCredit);

const addBillBalance = document.createElement('input');
addBillBalance.placeholder = "Balance";

const addBillLimit = document.createElement('input');
addBillLimit.placeholder = "Bill Limit";

const addBillCurrency = document.createElement('input');
addBillCurrency.placeholder = "Currency";

const addBillIsActive = document.createElement('select');

const activeBill = document.createElement("option");
const inActiveBill = document.createElement("option");
activeBill.value = true;
activeBill.text = 'Active bill';
inActiveBill.value = false;
inActiveBill.text = 'Inactive bill';
addBillIsActive.add(activeBill);
addBillIsActive.add(inActiveBill);

const addBillLastActive = document.createElement('input');
addBillLastActive.placeholder = "Last Active";

const addBillExpirationDate = document.createElement('input');
addBillExpirationDate.placeholder = "Expiration date";

const addBillButton = document.createElement('button');
addBillButton.innerHTML = 'Add bill';

const calculateAmount = document.createElement('div');
calculateAmount.style.display = 'flex';
calculateAmount.style.flexDirection = 'column';
calculateAmount.style.border = '1px solid black';
calculateAmount.style.padding = '5px';
calculateAmount.style.marginBottom = '20px';

const calculateAmountMenu = document.createElement('select');

const allAmount = document.createElement("option");
const activeDebt = document.createElement("option");
const inActiveDebt = document.createElement("option");
allAmount.value = 'all';
allAmount.text = 'All client\'s amount';
activeDebt.value = 'true';
activeDebt.text = 'Active client\'s debt';
inActiveDebt.value = 'false';
inActiveDebt.text = 'Inactive client\'s debt';
calculateAmountMenu.add(allAmount);
calculateAmountMenu.add(activeDebt);
calculateAmountMenu.add(inActiveDebt);

const calculateAmountButton = document.createElement('button');
calculateAmountButton.innerHTML = 'Calculate';

const calculateAmountResult = document.createElement('output');
calculateAmountResult.innerHTML = '0$'

newClientButton.addEventListener('click', () => {
  if (newClientIsActive.value === 'true') {
    bank.addClient(newClientName.value, true)
  }
  if (newClientIsActive.value === 'false') {
    bank.addClient(newClientName.value, false)
  }
  newClientName.value = '';
  mainContent.innerHTML = '';
  renderMainContent(bank.clients);
})

addBillButton.addEventListener('click', () => {
  let isActiveBill = true;
  if (addBillIsActive.value === 'false') {
    isActiveBill = false;
  }
  if (addBillType.value === 'debet') {
    bank.findClient(parseInt(addBillID.value)).addDebetBill(addBillCurrency.value, addBillExpirationDate.value,
      isActiveBill, addBillLastActive.value, parseInt(addBillBalance.value));
  } else {
    bank.findClient(parseInt(addBillID.value)).addCreditBill(addBillCurrency.value, addBillExpirationDate.value,
      isActiveBill, addBillLastActive.value, parseInt(addBillBalance.value), parseInt(addBillLimit.value))
  }

  addBillID.value = '';
  addBillCurrency.value = '';
  addBillExpirationDate.value = '';
  addBillLastActive.value = '';
  addBillBalance.value = '';
  addBillLimit.value = '';

  mainContent.innerHTML = '';
  renderMainContent(bank.clients);
})

calculateAmountButton.addEventListener('click', async function () {
  let result = 0;
  if (calculateAmountMenu.value === 'all') {
    result = await bank.calculateMoneyAmount();
  } else if (calculateAmountMenu.value === 'true') {
    result = await bank.calculateAccountTypeDebt(true);
  } else {
    result = await bank.calculateAccountTypeDebt(false);
  }
  calculateAmountResult.innerHTML = result + '$'
})

function renderSideContent(place) {
  place.append(operationBlock);
  operationBlock.append(createClient);
  createClient.append(createClientDatas);
  createClientDatas.append(newClientName);
  createClientDatas.append(newClientIsActive);
  createClient.append(newClientButton);
  operationBlock.append(addBill);
  addBill.append(addBillID);
  addBill.append(addBillType);
  addBill.append(addBillBalance);
  addBill.append(addBillLimit);
  addBill.append(addBillCurrency);
  addBill.append(addBillIsActive);
  addBill.append(addBillLastActive);
  addBill.append(addBillExpirationDate);
  addBill.append(addBillButton);
  operationBlock.append(calculateAmount);
  calculateAmount.append(calculateAmountMenu);
  calculateAmount.append(calculateAmountButton);
  calculateAmount.append(calculateAmountResult);
}