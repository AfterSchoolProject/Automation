const Promise = require('promise');
const vo = require('vo');
const coverLetter = require('./cover_letter.js');
const config = require('./config.js');

const testLinks = [
  "https://angel.co/fullstack-labs/jobs/233956-web-developer-software-engineer-mid-level-senior",
  "https://angel.co/rentlytics/jobs/243791-senior-software-engineer-sacramento",
  "https://angel.co/more-fitt/jobs/189741-lead-software-engineer"
];

function* applyToJobs(window, linksArray){
  console.log('Start applying...');

  for (let i = 0; i < linksArray.length; i++){
    yield window
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

  yield window
    .evaluate(() => {})
    .then(result => {});
}

module.exports = applyToJobs;