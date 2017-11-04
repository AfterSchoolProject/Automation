const vo = require('vo');
const fetchLinks = require('./fetch_links.js');
const attemptLogin = require('./login.js');
const auth = require('./authentication.js');
const applyToJobs = require('./apply.js');
const Nightmare = require('nightmare');

const nightmare = Nightmare({
  show: true,
  executionTimeout: 600000,
  waitTimeout: 60000000,
  alwaysOnTop: false,
  openDevTools: { mode: 'detach' }
}); 

function* automateApplications(){
  // Login to AngelList
  yield attemptLogin(nightmare, auth.email, auth.password); 

  // Get all links for matching title
  const links = yield fetchLinks(nightmare); 
  console.log(`${links.length} links found`);
  // Apply to all links
  yield applyToJobs(nightmare, links);
}

vo(automateApplications)();
