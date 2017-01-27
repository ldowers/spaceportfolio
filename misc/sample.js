var apod = require('nasa-apod');

var client = new apod.Client({
    apiKey: 'JPXW4jwdZEo1fq1gtEdPYRW9qc6coM21DMI7ODcD',
    conceptTags: true
});

// Get todays apod data 
client().then(function(body) {
    console.log(body);
});

// Get apod data for a specific date 
client(new Date(2015, 01, 01)).then(function(body) {
    console.log(body);
});