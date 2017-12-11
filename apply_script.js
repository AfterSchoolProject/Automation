 // Job title
$('.job-title > a').text();
// Poster name
$('span.name').text();
// Company name
$('.startup-title').text().replace('Apply to ', '');
// Text area value
$('.container > textarea').val();

const coverLetter = () => {
  const recruiter = $('span.name').text().split(' ')[0];
  const company = $('.startup-title').text().replace('Apply to ', '');
  const text = (
    `Hi ${recruiter},\n\nI saw your post and believe my skills in JavaScript, React, Redux, Ruby on Rails, Node.js, closely match the requirements for the position.\n\nMy background is in Aerospace Engineering and for the last 4 years, I've worked as a Process Engineer for a semiconductor company where my work ethic and passion for engineering enabled me to successfully spearhead projects to reduce costs and improve yield; increasing revenue by $4 + million annually. I decided to pursue a career in software and attended App Academy, a top coding school in San Francisco with less than 3% acceptance rate where I mastered web development technologies.\n\nI know you must be busy but I was hoping I could get 10 minutes of your time for a quick phone conversation.I would love to learn more about ${company} and understand what you’re looking for in a candidate.\n\nWould you be free sometime next week? My resume can be found on www.adrianrivero.me for your reference. I look forward to connecting!\n\nBest,\nAdrian`
  );

  $('.container > textarea').val(text);
};




// Hi xxxxxx,

// I saw the post and believe my skills in JavaScript, React, Redux, Ruby on Rails, Node.js, closely match the requirements for the position.

// My background is in Aerospace Engineering and for the last 4 years, I've worked as a Process Engineer for a semiconductor company where my work ethic and passion for engineering enabled me to successfully spearhead projects to reduce costs and improve yield; increasing revenue by $4 + million annually. I decided to pursue a career in software and attended App Academy, a top coding school in San Francisco with less than 3% acceptance rate where I mastered web development technologies.

// I know you must be super busy but I was hoping I could get 10 minutes of your time for a quick phone conversation.I would love to learn more about XXX and understand what you’re looking for in a candidate.

// Would you be free sometime next week? For your reference, my resume can be found on www.adrianrivero.me.I look forward to connecting!

// Best,
// Adrian