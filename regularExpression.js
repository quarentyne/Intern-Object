'use strict';

let mobileNumber = /^\+\d{2}\(\d{3}\)\d{3}(-\d{2}){2}$/;
let email = /^[a-z0-9._%+-]+@[a-z0-9-]+\.([a-z]{2,}\.?)+$/i;
let site = /^https?:\/\/[a-z0-9-]+\.([a-z]{2,}\.?)+$/i;
let password = /\w{6,25}$/;
let ipv4 = /([0-9]{1,3}\.){3}[0-9]{1,3}$/;
