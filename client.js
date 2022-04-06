'use strict';

function renderClient(place, clientCard) {
  const client = document.createElement('div');
  client.style.background = 'white';
  client.style.width = '45%';
  client.style.maxHeight = '45%';
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

  for (let debetBill of clientCard.debetBills) {
    const clientDebetBill = document.createElement('li');
    clientDebetBill.style.marginLeft = '15px';
    clientDebetBill.innerHTML = renderBill(debetBill, clientDebetBills, clientCard.debetBills);
  }

  const clientCreditBills = document.createElement('ul');
  client.append(clientCreditBills);
  clientCreditBills.innerHTML = 'Credit Bills:';
  clientCreditBills.style.margin = '0px';
  clientCreditBills.style.padding = '0px';

  for (let creditBill of clientCard.creditBills) {
    const clientCreditBill = document.createElement('li');
    clientCreditBill.style.marginLeft = '15px';
    clientCreditBill.innerHTML = renderBill(creditBill, clientCreditBills, clientCard.creditBills);
  }

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

  clientEdit.addEventListener('click', () => {
    const changeName = document.createElement('input');
    changeName.value = clientCard.fullName;
    clientName.innerHTML = '';
    clientName.append(changeName);
    clientEdit.innerHTML = 'Save';

    const changeClientActive = document.createElement('select');
    const changeIsActive = document.createElement("option");
    const changeIsInactive = document.createElement("option");

    changeIsActive.value = 'true';
    changeIsActive.text = 'Active';
    changeIsInactive.value = 'false';
    changeIsInactive.text = 'Inactive';

    changeClientActive.add(changeIsActive);
    changeClientActive.add(changeIsInactive);
    clientActive.innerHTML = '';
    clientActive.append(changeClientActive);

    clientEdit.addEventListener('click', () => {
      if (!checkName.test(changeName.value)) {
        displayError('Name');
        return;
      }

      if (changeClientActive.value === 'true') {
        clientCard.isActive = true;
      } else {
        clientCard.isActive = false;
      }

      clientCard.fullName = changeName.value;
      mainContent.innerHTML = '';
      renderMainContent(bank.clients);
    })
  })

  clientDelete.addEventListener('click', () => {
    for (let i = 0; i < bank.clients.length; i++) {
      if (bank.clients[i] === clientCard) {
        bank.clients.splice(i, 1);
        mainContent.innerHTML = '';
        renderMainContent(bank.clients);
        break;
      }
    }
  })
}