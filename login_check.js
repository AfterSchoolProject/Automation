const Nightmare = require('nightmare');

const nightmare = Nightmare({show: true});

const login_check = () => {
  console.log('Attempting login...');

  nightmare.goto('https://angel.co/login')
    .wait(2000)
    .type('input#user_email', 'adrivero89@gmail.com')
    .type('input#user_password', 'A@dRian89')
    .click('input[value="Log In"]')
    .wait(2000)
    .click('li.hide_when_handheld.u-inlineBlock.u-vAlignTop > a')
    .wait(10000)
    .evaluate(() => {
      const a = document.querySelectorAll('.title > a');
      const links = [];
      for (let i = 0; i < a.length; i++) {
        links.push(a[i].href);
      }
      return links;
    })
    .end()
    .then(result => console.log(`Finished ${result}`));
};

login_check();