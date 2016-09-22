# Soho Works Nexudus Theme

> Soho Works' Membership portal

## About

Nexudus is a 3rd party solution for running a cooworking space. Visit [spaces.nexudus.com](http://spaces.nexudus.com) to get started (ask a human for an account).

1. Visit _System > Web Templates_ to view the list of templates. 
2. Sync Dropbox by opening Dropbox > Connect Dropbox
3. The template files will be added to your local dropbox under _Apps > Nexudus Spaces > Nexudus Spaces > {Site Name}_

## Prerequisites

This repo uses [Gulp](http://gulpjs.com) to run tasks to make things easier.

- _NPM_ - Install NPM
- _Gulp_ - Install globally by `npm install gulp -g`

## Setup

1. Run `npm install` to install dependencies.
2. Create `.env` in the project root with `STAGING_PATH` and `PRODUCTION_PATH` keys with the full path of the destination local Dropbox folders.

## Develop

Run `gulp` to initialize the task runner, which will watch all project files. 

The following tasks run:

1. **Files**: this task copies all files to the staging Dropbox folder defined in `.env`
2. **Stylesheets**: this task compiles all SCSS in `/Stylesheets` into `css.css` in the staging Dropbox folder
3. **Emails**: This file compiles Nunjuck templates from `/Emails/partials` and `/Emails/layouts` into complete HTML files in `/Emails`. These need to be copied into the Nexudus web interface.

## Deploy

Run `gulp deploy` to build minified CSS and copy everything to the production Dropbox folder.

Checkout `gulpfile.js` for what the tasks are actually doing.
