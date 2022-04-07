'use strict';

import { renderClient } from './client.js';

export const mainContent = document.createElement('main');
export const sideContent = document.createElement('aside');
export const errorPlace = document.createElement('p');

export function renderMainContent(clients, bank) {
  for (let client of clients) {
    renderClient(mainContent, client, bank);
  }
}