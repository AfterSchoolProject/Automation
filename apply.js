const Nightmare = require('nightmare');
const Promise = require('promise');
const vo = require('vo');
const coverLetter = require('./cover_letter.js');

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
    .goto('https://angel.co/login')
    .wait(2000)
    .type('input#user_email', 'adrivero89@gmail.com')
    .type('input#user_password', 'A@dRian89')
    .click('input[value="Log In"]')
    .wait(3000);

  for (let i = 0; i < linksArray.length; i++){
    yield nightmare.goto(linksArray[i])
    .wait(3000)
    .exists('.buttons.js-apply.applicant-flow-dropdown > a')
    .click('.buttons.js-apply.applicant-flow-dropdown > a')
    .wait(3000)
    .catch(error => {
      console.log('Already applied:', error);
    });
  }

  yield nightmare.evaluate(() => {})
    .then(result => {});
    // .goto(testLink)
    // .wait(3000)
    // .evaluate(() => {})
    // .then(result => {

    // });
}

vo(applyToJobs(testLinks))(function(err, result){
  if (err) { throw err; }
});

function checkIfApplied(){
  
}