'use strict';

const operationBlock = document.createElement('div');
operationBlock.style.width = '300px';
document.body.append(operationBlock);

const newClientName = document.createElement('input');
newClientName.placeholder = "ФИО";
operationBlock.append(newClientName);

const newClientIsActive = document.createElement('select');
const activeClient = document.createElement("option");
const inActiveClient = document.createElement("option");
activeClient.value = 'true';
activeClient.text = 'Active';
inActiveClient.value = 'false';
inActiveClient.text = 'Inactive';
newClientIsActive.add(activeClient);
newClientIsActive.add(inActiveClient);

operationBlock.append(newClientIsActive);
