'use strict';

export const checkID = /^[0-9]+$/;
export const checkName = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}(\s[a-zA-Z]{2,})?$/;
export const checkMoney = /^[0-9]+$/;
export const checkCurrency = /^[a-zA-Z]{3}$/;
export const checkDate = /^(([0][1-9])|([12][0-9])|([3][01]))\.(([0][1-9])|([1][0-2]))\.([2][0-9]{3})$/;

export function displayError(text, place) {
  place.innerHTML = `${text} is not correct`;
  setTimeout(() => {
    place.innerHTML = '';
  }, 5000)
}