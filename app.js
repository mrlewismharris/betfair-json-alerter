const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const http = require('http');

//server conf
const serverport = '3000';

//display odds list parameters
const url = 'https://www.betfair.com/sport/inplay';
const loopDelay = 2500;
const minOdds = "1/50";





//some global vars
const returnMax = (minOdds.split('/')[0]) / (minOdds.split('/')[1]);
console.log("Min odds loaded: " + minOdds + " : " + returnMax + " : ~" + (returnMax*100) + "% return");
var lastCount = "";

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
			if (lastCount!==countBets(out)) {
				lastCount=countBets(out);
				console.log("Total bet count updated: " + countBets(out) + "/" + count);
			}
		});
	});
	setTimeout(loop, loopDelay);
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

http.createServer(function (req, res) {
	var fileReq = "/index.html";
	if (req.url!=="/") {
		fileReq=req.url;
	}
  fs.readFile(__dirname + fileReq, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(serverport);
console.log("Server started on port " + serverport);
