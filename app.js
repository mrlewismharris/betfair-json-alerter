const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

const url = 'https://www.betfair.com/sport/inplay';
//returned 1/100 = 0.01 (0.01=1% return)
const returnMax = 0.05;

function loop() {
	request(url, function(error, response, body) {
		const $ = cheerio.load(body);
		var inPlayGames = $('.ui-display-fraction-price');
		var count = inPlayGames.length;
			
		var out = [];
		for (var i=0;i<inPlayGames.length;i++) {
			var temp = [];
			//push url
			//console.log(inPlayGames[i]['parent']['parent']['parent']['parent']);
			if (inPlayGames[i]['parent']['parent']['parent']['parent']['prev']['prev']) {
				temp.push("https://www.betfair.com"+inPlayGames[i]['parent']['parent']['parent']['parent']['prev']['prev']['attribs']['href']);
				//push odds
				if (inPlayGames[i]['children'][0]['data'].trim()!=="") {
					var getOdds = inPlayGames[i]['children'][0]['data'];
					temp.push(getOdds.replace(/\n/g, "").replace(/ /g, ""));
					out.push(temp);
				}
			}
		}
		fs.writeFile('data.json', JSON.stringify(out), function(err) {
			if (err) throw err;
			console.log("Bets within max value: " + countBets(out) + "/" + count);
		});
	});
	setTimeout(loop, 10000);
};loop();

function countBets(data) {
	var count = 0;
	var out = []
	for (var i=0;i<data.length;i++) {
		var temp = (data[i][1].split("/")[0])/(data[i][1].split("/")[1]);
		if (temp<=returnMax) {
			count++;
			out.push(data[i]);
		}
	}
	fs.writeFile('validated.json', JSON.stringify(out), function(err) {
		if (err) throw err;
	});
	return count;
}


