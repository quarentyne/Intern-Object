'use strict';

const client = document.createElement('div');
client.style.maxWidth = '200px';
client.style.paddingLeft = '5px';
client.style.paddingRight = '5px';
client.style.border = 'solid black 2px'
document.body.append(client);

const clientNameLine = document.createElement('div');
client.append(clientNameLine);
clientNameLine.style.display = 'flex';
clientNameLine.style.justifyContent = 'space-between';

const clientName = document.createElement('p');
clientNameLine.append(clientName);
clientName.innerHTML = 'Name';

const clientActive = document.createElement('p');
clientNameLine.append(clientActive);
clientActive.innerHTML = 'Active';

const clientBills = document.createElement('div');
client.append(clientBills);
clientBills.innerHTML = 'Bills:';

const clientFooter = document.createElement('div');
client.append(clientFooter);
clientFooter.style.display = 'flex';
clientFooter.style.justifyContent = 'space-between';

const clientID = document.createElement('p');
clientFooter.append(clientID);
clientID.innerHTML = 'ID';

const clientJoinDate = document.createElement('p');
clientFooter.append(clientJoinDate);
clientJoinDate.innerHTML = 'join-date';

const clientControl = document.createElement('div');
client.append(clientControl);
clientControl.style.display = 'flex';
clientControl.style.justifyContent = 'space-between';

const clientEdit = document.createElement('button');
clientEdit.innerHTML = 'Edit';
clientControl.append(clientEdit);

const clientDelete = document.createElement('button');
clientDelete.innerHTML = 'Delete';
clientControl.append(clientDelete);