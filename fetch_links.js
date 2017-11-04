const Nightmare = require('nightmare');
const Promise = require('promise');
const filters = require('./job_filters.js');
const config = require('./config.js');

function* fetchLinks(window){
  console.log("Fetching application links...");

  return yield window
    .click(config.jobsBtn)
    .wait(5000)
    .click(config.removeFilterBtn) // 3 clicks to clear all filters
    .click(config.removeFilterBtn)
    .click(config.removeFilterBtn)
    .mouseover(config.locationMenu)
    .wait(200)
    .type(config.locationInput, `${filters.locationFilter}\u000d`)
    // .wait(1000)
    .click(config.locationInput)
    .type(config.locationInput, '\u000d')
    .wait(1000)
    // .click(`${config.locationFilterBtn}"${filters.locationFilter}"]`)
    .click(config.keywordSearchInput)
    .type(config.keywordInput, `${filters.jobTitle}\u000d`)
    .wait(5000)
    .evaluate(() => {
      console.log("Scroll starting...");

      // Scroll to the end of the page to expose all job posts
      const scroll =  new Promise((resolve, reject) => {
        const scrollInterval = setInterval(() => {
          window.scrollTo(0, 1000000000000000000);
          if (document.querySelector('.end.hidden.section').style.display === 'block') {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 2000);
      });

      // Get all the links filtering for job title.
      return scroll.then(() => {
        const links = [];
        const linksSelector = document.querySelectorAll('.title > a');

        for (let i = 0; i < linksSelector.length; i++) {
          // Job title isn't valid if it contains any of the filter keywords
          let isTitleValid = true;
          filters.excludeKeywords.forEach(keyword => {
            if (linksSelector[i].text
                .toLowerCase()
                .includes(keyword)) { 
                  isTitleValid = false;
                  return;
                }
          });

          if (isTitleValid) { 
            links.push(linksSelector[i].href);
          }
        }

        return links;
      });
    })
    .then(result => {
      console.log("End reached");
      return result;
    });
}


// vo(fetchLinks())(function (err, res) {
//   if (err) { throw err; }
// });



// const fetchLinks = () => {
//   console.log('Attempting login...')

//   return nightmare
//     .goto(config.loginLink)
//     .wait(2000)
//     .type(config.emailInput, config.email)
//     .type(config.passwordInput, config.password)
//     .click(config.loginBtn)
//     .wait(3000)
//     .click(config.jobsBtn)
//     .wait(5000)
//     .click(config.removeFilterBtn) // 3 clicks to clear all filters
//     .click(config.removeFilterBtn)
//     .click(config.removeFilterBtn)
//     .click(`${config.locationFilterBtn}"${filters.locationFilter}"]`)
//     .click(config.keywordSearchInput)
//     .type(config.keywordInput, `${filters.jobTitle}\u000d`)
//     .wait(5000)
//     .evaluate(() => {
//       console.log("Scroll starting...");

//       // Scroll to the end of the page to expose all job posts
//       const scroll =  new Promise((resolve, reject) => {
//         const scrollInterval = setInterval(() => {
//           window.scrollTo(0, 1000000000000000000);
//           if (document.querySelector('.end.hidden.section').style.display === 'block') {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, 2000);
//       });

//       // Get all the links filtering for job title.
//       return scroll.then(() => {
//         const links = [];
//         const linksSelector = document.querySelectorAll('.title > a');

//         for (let i = 0; i < linksSelector.length; i++) {
//           // Job title isn't valid if it contains any of the filter keywords
//           let isTitleValid = true;
//           filters.excludeKeywords.forEach(keyword => {
//             if (linksSelector[i].text
//                 .toLowerCase()
//                 .includes(keyword)) { 
//                   isTitleValid = false;
//                   return;
//                 }
//           });

//           if (isTitleValid) { 
//             links.push(linksSelector[i].href);
//           }
//         }

//         return links;
//       });
//     })
//     .then(result => {
//       console.log("End reached");
//       return result;
//     });
// };

module.exports =  fetchLinks;