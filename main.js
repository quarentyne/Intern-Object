'use strict';

import { Bank } from "./object.js"
import { renderSideContent } from "./bankOperations.js";
import { renderMainContent, mainContent, sideContent } from "./renderContent.js";

let bank = new Bank();

document.body.style.margin = '0px';
document.body.style.padding = '0px';
document.body.style.display = 'flex';

mainContent.style.background = 'black';
mainContent.style.minHeight = '100vh';
mainContent.style.width = '80%';
mainContent.style.display = 'flex';
mainContent.style.flexWrap = 'wrap';
mainContent.style.justifyContent = 'space-around'
document.body.append(mainContent);

sideContent.style.background = 'red';
sideContent.style.width = '20%';
sideContent.style.minHeight = '100vh';
document.body.append(sideContent);

renderSideContent(sideContent, bank);
renderMainContent(bank.clients, bank);