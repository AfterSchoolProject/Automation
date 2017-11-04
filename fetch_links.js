const Nightmare = require('nightmare');
const Promise = require('promise');
const filters = require('./job_filters.js');
const config = require('./config.js');
const util = require('./util.js');

function* fetchLinks(window, scrollDelay){
  console.log("Fetching application links...");

  const excludeKeywords = filters.excludeKeywords;
  
  return yield window
    .click(config.jobsBtn)
    .wait(config.removeFilterBtn) // Wait until the page loads with filters
    .click(config.removeFilterBtn) // 3 clicks to clear all filters
    .click(config.removeFilterBtn)
    .click(config.removeFilterBtn)
    .mouseover(config.locationMenu)
    .wait(200)
    .type(config.locationInput, `${filters.locationFilter}\u000d`)
    .click(config.locationInput)
    .type(config.locationInput, '\u000d')
    .click(config.locationInput)
    .type(config.locationInput, '\u000d')
    // .wait(1000)
    // .click(config.keywordSearchInput)
    // .type(config.keywordInput, `${filters.jobTitle}\u000d`)
    .wait(5000)
    .evaluate(excludeKeywords => {
      console.log("Scroll starting...");      
      // Scroll to the end of the page to expose all job posts
      const scroll = new Promise(function(resolve, reject){
        const getRandomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const scrollInterval = setInterval(() => {
          if (document.querySelector('.end.hidden.section').style.display !== 'block') {
            setTimeout(() => window.scrollTo(0, 100000000000), getRandomInt(3000, 5000));
          }
          else { 
            clearInterval(scrollInterval);
            resolve(); 
          }        
        }, 5000);
      });
      // const scroll =  new Promise(function(resolve, reject){
      //   const scrollInterval = setInterval(() => {
      //     {
      //       clearInterval(scrollInterval);
      //       console.log('Scroll reached end');
      //       resolve();
      //     }
      //     else {
      //       window.scrollTo(0, 1000000000000000000);
      //     }
      //   }, 3000);
      // });

      // Get all the links filtering for job title.
      return scroll.then(() => {
        console.log("Grabbing all links...");

        const links = [];
        const linksSelector = document.querySelectorAll('.title > a');
        
        for (let i = 0; i < linksSelector.length; i++) {
          // Job title isn't valid if it contains any of the filter keywords
          let isTitleValid = true;
          excludeKeywords.forEach(keyword => {
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
      }).catch(error => { 
        console.log(error);
        return error; 
      });
    }, excludeKeywords)
    .then(result => {
      return result;
    }).catch(error => console.log('Error getting links:', error));
}

module.exports =  fetchLinks;