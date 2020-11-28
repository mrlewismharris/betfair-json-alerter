# betfair-json-alerter
WIP: A nodejs script that scrapes the in-play bets on betfair's website and grabs all the odds for every possible bet, places them in an unordered array, outputting all bets to 1 json - and bets with a certain % return to another json. Primary use for this is as a 1.01 betting strat bot.

GitHub pages hosted index.html (calculator) : https://mrlewismharris.github.io/betfair-json-alerter/

# Requires
- cheerio (npm i cheerio)
- request (npm i request)

# What does this do?
Running the app.js will (hopefully) produce 2 json outputs, "data.json" contains ALL the possible bets from in-play, and "validated.json" which contains only bets with the minimum odds.

# Why?
This was a personal project, used to scrape and identify in-play bets within a min-return and (hopefully) safer betting range, used this with the "1.01" betting strat.

# demo.html usage
Place into same directory as app.js (and json outputs) - browsers security standards don't allow local file loading (i.e. this index.html loaded into firefox cannot load the .json files, console.log recieves an error about CORS or something, annoyingly). Make sure you host this file and the json files in a web-server - I wouldn't suggest opening this app to the internet for security reasons, especially with the current setup/config with the app.js in the same directory.

# Todo
- [ ] add more data from betfair scrape (at the moment it's only url and odds):
  - [ ] title
  - [ ] sport
  - [ ] type of bet instance
  - [ ] implement data into index.html demo
- [ ] demo index.html add html notifications to alert user on new bets
  - [ ] checkbox each row to disable its notification
- [ ] Scraped history: Output a file with json data of all the matches, like below

proposed betfair bet history json:
{
  {
    "title": "team-vs-team",
    "url": "https://www.betfair.com/sport/football/team-vs-team/0123285",
    "Odds": [
        {"date": "odds"}
      ]
  }
}
