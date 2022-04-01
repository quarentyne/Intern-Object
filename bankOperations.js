'use strict';

const operationBlock = document.createElement('div');
operationBlock.style.width = '300px';
document.body.append(operationBlock);

const createClient = document.createElement('div');
createClient.style.display = 'flex';
createClient.style.flexDirection = 'column';
createClient.style.border = '1px solid black';
createClient.style.padding = '5px';
createClient.style.marginBottom = '20px';
operationBlock.append(createClient);

const createClientDatas = document.createElement('div');
createClientDatas.style.display = 'flex';
createClient.append(createClientDatas);

const newClientName = document.createElement('input');
newClientName.style.width = '100%';
newClientName.placeholder = "ФИО";
createClientDatas.append(newClientName);

const newClientIsActive = document.createElement('select');
createClientDatas.append(newClientIsActive);

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
createClient.append(newClientButton);

const addBill = document.createElement('div');
addBill.style.display = 'flex';
addBill.style.flexDirection = 'column';
addBill.style.border = '1px solid black';
addBill.style.padding = '5px';
addBill.style.marginBottom = '20px';
operationBlock.append(addBill);

const addBillID = document.createElement('input');
addBillID.placeholder = "Client ID";
addBill.append(addBillID);

const addBillType = document.createElement('select');
addBill.append(addBillType);

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
addBill.append(addBillBalance);

const addBillLimit = document.createElement('input');
addBillLimit.placeholder = "Bill Limit";
addBill.append(addBillLimit);

const addBillCurrency = document.createElement('input');
addBillCurrency.placeholder = "Currency";
addBill.append(addBillCurrency);

const addBillIsActive = document.createElement('select');
addBill.append(addBillIsActive);

const activeBill = document.createElement("option");
const inActiveBill = document.createElement("option");
activeBill.value = 'true';
activeBill.text = 'Active bill';
inActiveBill.value = 'false';
inActiveBill.text = 'Inactive bill';
addBillIsActive.add(activeBill);
addBillIsActive.add(inActiveBill);

const addBillLastActive = document.createElement('input');
addBillLastActive.placeholder = "Last Active";
addBill.append(addBillLastActive);

const addBillExpirationDate = document.createElement('input');
addBillExpirationDate.placeholder = "Expiration date";
addBill.append(addBillExpirationDate);

const addBillButton = document.createElement('button');
addBillButton.innerHTML = 'Add bill';
addBill.append(addBillButton);

const calculateAmount = document.createElement('div');
calculateAmount.style.display = 'flex';
calculateAmount.style.flexDirection = 'column';
calculateAmount.style.border = '1px solid black';
calculateAmount.style.padding = '5px';
calculateAmount.style.marginBottom = '20px';
operationBlock.append(calculateAmount);

const calculateAmountMenu = document.createElement('select');
calculateAmount.append(calculateAmountMenu);

const allAmount = document.createElement("option");
const activeAmount = document.createElement("option");
const inActiveAmount = document.createElement("option");
allAmount.value = 'all';
allAmount.text = 'All client\'s amount';
activeAmount.value = 'true';
activeAmount.text = 'Active client\'s amount';
inActiveAmount.value = 'false';
inActiveAmount.text = 'Inactive client\'s amount';
calculateAmountMenu.add(allAmount);
calculateAmountMenu.add(activeAmount);
calculateAmountMenu.add(inActiveAmount);

const calculateAmountButton = document.createElement('button');
calculateAmountButton.innerHTML = 'Calculate Amount';
calculateAmount.append(calculateAmountButton);

const calculateAmountResult = document.createElement('output');
calculateAmountResult.innerHTML = '0$'
calculateAmount.append(calculateAmountResult);
