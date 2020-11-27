# betfair-json-alerter
WIP: A nodejs script that scrapes the in-play bets on betfair's website and grabs all the odds for every possible bet, places them in an unordered array, outputting all bets to 1 json - and bets with a certain % return to another json. Primary use for this is as a 1.01 betting strat bot.

# requires
- cheerio (npm i cheerio)
- request (npm i request)
