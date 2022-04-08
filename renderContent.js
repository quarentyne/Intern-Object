'use strict';

import { renderClient } from './client.js';

export const mainContent = document.createElement('main');
export const sideContent = document.createElement('aside');
export const errorPlace = document.createElement('p');

mainContent.classList.add('main-content');
sideContent.classList.add('side-content');
errorPlace.classList.add('side-content__error');

export function renderMainContent(clients, bank) {
  for (let client of clients) {
    renderClient(mainContent, client, bank);
  }
}