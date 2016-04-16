var IOException = {};
var ParseException = {};

var cheerio = require('cheerio');
var request = require('request');

function getVerse(reference, version) {
	var page = requestReference(reference);
	var verse = scrapeForVerse(page);
}

function requestReference(reference, version) {
	request({
		uri: 'https://www.biblegateway.com/passage/',
		qs: {
			search: reference,
			version: version
		}, 
	}, handleResponse);
}

function handleResponse(error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);
	}
}

function scrapeForVerse(html) {
	var $ = cheerio.load(html);
	var text = $('.passage-content div')
		.first()
		.find('.text')
		.contents()
		.filter(function() {
			return this.nodeType == 3;
		}).text();
	text.replace(/\.\w/g, '. ');
}

getVerse("Revelation 10", "NASB");