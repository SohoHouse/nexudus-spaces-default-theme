#Soho Works x Nexudus
 
This repo contains our adjustments to the views and styles of Nexudus' front end portal.

##Development
In order to keep things a little DRYer, we've used [gulp](gulpjs.com) to process SASS into CSS.

* Run `npm install` to setup
* Run `gulp` to make gulp watch your SASS files and process them when you save them.
* Run `gulp build:sass` to build SASS files once
* Use an `-m` flag with either gulp task to minify the CSS

##Deploy
Visit [https://spaces.nexudus.com/Templates#](https://spaces.nexudus.com/Templates#) and stick your code in the appropriate hole.
