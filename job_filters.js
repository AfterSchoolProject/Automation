const LOCATION = 1;

const searchLocations = [
  'San Francisco',
  'Sacramento'
];

// const searchLocations = [
//   '1692-San Francisco, CA',
//   '1814-Sacramento, CA'
// ];

const searchPositions = [
  'Software Engineer',
  'Software Developer'
];

exports.excludeKeywords = [
  'senior',
  'sr',
  'lead'
];

exports.locationFilter = searchLocations[LOCATION];
exports.jobTitle = 'Software Engineer';