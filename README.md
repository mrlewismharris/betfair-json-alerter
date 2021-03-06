# PLEASE READ:
There's a massive issue that causes the app to crash on no response. This issue produces very strange effects, lags out the rest of my connection, maybe don't use wifi?

# betfair-json-alerter
A nodejs app that loops a scrape of the in-play bets available from betfair and hosts an http web-server.

GitHub pages hosted index.html (calculator) : https://mrlewismharris.github.io/betfair-json-alerter/

# Requires
- nodejs (https://nodejs.org/en/download/)
- cheerio (npm i cheerio)
- request (npm i request)

# How to use
 - save all files in a folder
 - install required moduels: 
  - open cmd, cd to the folder you just made,
  - install cheero and request (use commands in the requires section above)
 - run "start-app.bat" (windows only)
 - go to http://localhost:3000/ to view the list demo
 - (optional) open "app.js" in a text editor to change the min odds, loop delay (in ms) and server port.

# What does this do?
Running the app.js will produce 2 json outputs, "data.json" containing ALL the possible bets from in-play, and "validated.json" containing only bets up to the minimum odds. Connect to localhost:3000 (or custom port) to view the validated.json listed in a nice html table.

# Why?
This was a personal project, used to scrape and identify in-play bets within a min-return and (hopefully) safer betting range, use this with the 1.01 or large spread betting strat.

# Todo
- [ ] add more data from betfair scrape (at the moment it's only url and odds):
  - [ ] title
  - [ ] sport
  - [ ] type of bet instance
  - [ ] implement data into index.html demo
- [ ] add html notifications to alert user on new bets
  - [ ] checkbox each row to disable its notification
- [ ] Scraped history: Output a file with json data of all the matches, like below

proposed betfair bet history json:
```
{
  {
    "title": "team-vs-team",
    "url": "https://www.betfair.com/sport/football/team-vs-team/0123285",
    "Odds": [
        {"date": "odds"}, {"date": "odds"}
      ]
  }
}
```
