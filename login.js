const Nightmare = require('nightmare');
const config = require('./config.js');
const auth = require('./authentication');

const nightmare = Nightmare({ show: true, executionTimeout: 600000 });

function* attemptLogin(email, password){
  console.log("Attempting login...");

  yield nightmare
    .goto(config.loginLink)
    .wait(2000)
    .type(config.emailInput, email)
    .type(config.passwordInput, password)
    .click(config.loginBtn)
    .wait(3000);

  // return function* (){
  //   yield nightmare
  //     .goto(config.loginLink)
  //     .wait(2000)
  //     .type(config.emailInput, email)
  //     .type(config.passwordInput, password)
  //     .click(config.loginBtn)
  //     .wait(3000);
  // };
}

module.exports = attemptLogin;