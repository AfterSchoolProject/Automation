const fetchLinks = require('./fetch_links.js');

// Fetch all links pertaining to job post
// Filter links by job name

console.log(fetchLinks().then((res) => console.log(res)));
