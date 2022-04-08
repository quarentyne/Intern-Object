'use strict';

import { Bank } from "./object.js"
import { renderSideContent } from "./bankOperations.js";
import { renderMainContent, mainContent, sideContent } from "./renderContent.js";

let bank = new Bank();

document.body.append(mainContent);
document.body.append(sideContent);

renderSideContent(sideContent, bank);
renderMainContent(bank.clients, bank);