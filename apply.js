const Nightmare = require('nightmare');
const Promise = require('promise');
const vo = require('vo');
const coverLetter = require('./cover_letter.js');
const config = require('./config.js');

const nightmare = Nightmare({ show: true, executionTimeout: 600000 });

const testLink = 'https://angel.co/fullstack-labs/jobs/233956-web-developer-software-engineer-mid-level-senior';

const testLinks = [
  "https://angel.co/fullstack-labs/jobs/233956-web-developer-software-engineer-mid-level-senior",
  "https://angel.co/rentlytics/jobs/243791-senior-software-engineer-sacramento",
  "https://angel.co/more-fitt/jobs/189741-lead-software-engineer"
];

function* applyToJobs(linksArray){
  console.log('Testing apply');

  yield nightmare
    .goto(config.loginLink)
    .wait(2000)
    .type(config.emailInput, config.email)
    .type(config.passwordInput, config.password)
    .click(config.loginBtn)
    .wait(3000);

  for (let i = 0; i < linksArray.length; i++){
    yield nightmare
      .goto(linksArray[i])
      .wait(3000)
      .exists(config.applyBtn)
      .click(config.applyBtn)
      .wait(3000)
      .insert(config.noteArea, coverLetter())
      .wait(3000)
      .catch(error => {
        console.log('Already applied:', error);
      });
  }

  yield nightmare
    .evaluate(() => {})
    .then(result => {});
    // .goto(testLink)
    // .wait(3000)
    // .evaluate(() => {})
    // .then(result => {

    // });
}

vo(applyToJobs(testLinks))(function (err, res) {
  if (err) { throw err; }
});

module.exports = applyToJobs;