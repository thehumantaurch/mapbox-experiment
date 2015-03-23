### DC Theater Map

1. `rake db:create` and `rake db:migrate`
2.  `bundle install`
3.  `shotgun config.ru`

Note: It may take some time for the scraper to gather the database information when first run.

#The App:
This web app is a map of current theatrical productions in the greater Washington, DC area using Mapbox.js with information scraped from theatrewashington.org. Marker symbols denote genre of play; marker colors denote price of tickets. Clickable interface filters markers by whether a show performs tonight, is upcoming, or closed. Markers can be clicked for more information and link to buy tickets.