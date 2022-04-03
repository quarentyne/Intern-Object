'use strict';

let bank = new Bank();
bank.addClient('Igor', true);
bank.addClient('Miha', true);
bank.addClient('John', true);
bank.addClient('Lev', false);
bank.addClient('Tiger', true);

document.body.style.margin = '0px';
document.body.style.padding = '0px';
document.body.style.display = 'flex';

const mainContent = document.createElement('main');
mainContent.style.background = 'black';
mainContent.style.minHeight = '100vh';
mainContent.style.width = '80%';
mainContent.style.display = 'flex';
mainContent.style.flexWrap = 'wrap';
mainContent.style.justifyContent = 'space-around'
document.body.append(mainContent);

const sideContent = document.createElement('aside');
sideContent.style.background = 'red';
sideContent.style.width = '20%';
sideContent.style.minHeight = '100vh';
document.body.append(sideContent);

function renderMainContent(clients) {
  for (let client of clients) {
    renderClient(mainContent, client);
  }
}
bank.findClient(0).addDebetBill('USD', 'today', true, 'today', 1000);
bank.findClient(3).addCreditBill('USD', 'today', true, 'today', 1000, 2000);

renderSideContent(sideContent);
renderMainContent(bank.clients);