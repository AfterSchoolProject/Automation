// const Nightmare = require('nightmare');
const config = require('./config.js');
const auth = require('./authentication');

// const nightmare = Nightmare({ show: true, executionTimeout: 600000 });

function* attemptLogin(window, email, password){
  console.log("Attempting login...");

  yield window
    .goto(config.loginLink)
    .wait(2000)
    .type(config.emailInput, email)
    .type(config.passwordInput, password)
    .click(config.loginBtn)
    .wait(3000);
}

module.exports = attemptLogin;