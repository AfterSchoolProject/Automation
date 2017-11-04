const config = require('./config.js');
const Nightmare = require('nightmare');
const auth = require('./authentication.js');

const nightmare = Nightmare({
  show: true,
  waitTimeout: 6000000000 
});

nightmare
  .goto(config.loginLink)
  .wait(2000)
  .insert(config.emailInput, auth.email)
  .insert(config.passwordInput, auth.password)
  .click(config.loginBtn)
  .then(() => {});