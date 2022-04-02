'use strict';

function renderClient(place, clientCard) {
	const client = document.createElement('div');
	client.style.background = 'white';
	client.style.width = '45%';
	client.style.paddingLeft = '15px';
	client.style.paddingRight = '15px';
	client.style.border = 'solid black 2px'
	place.append(client);

	const clientNameLine = document.createElement('div');
	client.append(clientNameLine);
	clientNameLine.style.display = 'flex';
	clientNameLine.style.justifyContent = 'space-between';

	const clientName = document.createElement('p');
	clientNameLine.append(clientName);
	clientName.innerHTML = clientCard.fullName;

	const clientActive = document.createElement('p');
	clientNameLine.append(clientActive);
	if (clientCard.isActive) {
		clientActive.innerHTML = 'Active';
	} else {
		clientActive.innerHTML = 'Inactive';
	}

	const clientDebetBills = document.createElement('ul');
	client.append(clientDebetBills);
	clientDebetBills.innerHTML = 'Debet Bills:';
	clientDebetBills.style.margin = '0px';
	clientDebetBills.style.padding = '0px';

	const clientDebetBill = document.createElement('li');
	clientDebetBills.append(clientDebetBill);
	clientDebetBill.style.marginLeft = '15px';
	clientDebetBill.innerHTML = 'bill'

	const clientCreditBills = document.createElement('ul');
	client.append(clientCreditBills);
	clientCreditBills.innerHTML = 'Credit Bills:';
	clientCreditBills.style.margin = '0px';
	clientCreditBills.style.padding = '0px';

	const clientCreditBill = document.createElement('li');
	clientCreditBills.append(clientCreditBill);
	clientCreditBill.style.marginLeft = '15px';
	clientCreditBill.innerHTML = 'bill'

	const clientFooter = document.createElement('div');
	client.append(clientFooter);
	clientFooter.style.display = 'flex';
	clientFooter.style.justifyContent = 'space-between';

	const clientID = document.createElement('p');
	clientID.style.marginRight = '25px';
	clientFooter.append(clientID);
	clientID.innerHTML = 'ID ' + clientCard.id;

	const clientJoinDate = document.createElement('p');
	clientFooter.append(clientJoinDate);
	clientJoinDate.innerHTML = 'Join Date:' + clientCard.joinDate.getDate() + '.' +
		clientCard.joinDate.getMonth() + '.' + clientCard.joinDate.getFullYear();

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
}