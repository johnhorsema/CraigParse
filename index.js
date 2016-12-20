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
 
client
  .search(options, 'contact -realtor -agent -management -apartment -duplex -regency -www -pioneer -realty')
  .then((listings) => {
    // filtered listings (by price) 
    listings.forEach((listing) => {
    	console.log(listing);

    	// Get the detals
    	// client.details(listing)
    	// .then((details) => {
    	// 	console.log(details);
    	// })
  	})

  	// export listings as CSV
  	var csv_data = baby.unparse(listings);
  	fs.writeFile('result.csv', csv_data, function (err) {
	  if (err) return console.log(err);
	  console.log('exported data to result.csv');
	});

  })
  .catch((err) => {
    console.error(err);
  });