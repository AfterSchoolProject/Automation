const vo = require('vo');
const fetchLinks = require('./fetch_links.js');
const attemptLogin = require('./login.js');
const auth = require('./authentication.js');
// const applyToJobs = require('./apply.js');
const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true, executionTimeout: 600000 });

function* automateApplications(){
  yield vo(attemptLogin)(nightmare, auth.email, auth.password); // Login to AngelList

  // yield attemptLogin(auth.email, auth.password); // Login to AngelList

  const links = yield vo(fetchLinks)(nightmare); // Get all links for matching title

  // yield applyToJobs(links);
}

vo(automateApplications())(function (err, result) {
  if (err) { throw err; }
});

// console.log(fetchLinks().then((res) => console.log(res)));
