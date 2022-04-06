'use strict';

const checkID = /^[0-9]+$/;
const checkName = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}(\s[a-zA-Z]{2,})?$/;
const checkMoney = /^[0-9]+$/;
const checkCurrency = /^[a-zA-Z]{3}$/;
const checkDate = /^(([0][1-9])|([12][0-9])|([3][01]))\.(([0][1-9])|([1][0-2]))\.([2][0-9]{3})$/;

function displayError(text) {
    errorPlace.innerHTML = `${text} is not correct`;
    setTimeout(() => {
        errorPlace.innerHTML = '';
    }, 5000)
}