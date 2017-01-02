var
  fs = require('fs'),
  baby = require('babyparse'),
  craigslist = require('node-craigslist'),
  client = new craigslist.Client({
    city : 'baltimore'
  }),
  options = {
    category : 'apa',
    minAsk : '1000'
  };

var result = [];

client
  .search(options, 'contact -realtor -agent -management -apartment -duplex -regency -www -pioneer -realty')
  .then((listings) => {
    // filtered listings (by price) 
    listings.forEach((listing) => {
    	// console.log(listing);

    	// Get the details
    	client.details(listing)
    	.then((details) => {
		    details.forEach((item) => {
				result.push({
					pid: details.pid,
					replyUrl: details.replyUrl,
					title: details.title,
					url: details.url,
					postedAt: details.postedAt,
					map: details.mapUrl
				});
		    });
    	})
  	});

  	console.log(result);


  	// export listings as CSV
  	var csv_data = baby.unparse(result);
  	fs.writeFile('result.csv', csv_data, function (err) {
	  if (err) return console.log(err);
	  console.log('exported data to result.csv');
	});

  })
  .catch((err) => {
    console.error(err);
  });