# Soho Works Nexudus Theme

This repo uses Gulp to run tasks to make things easier.

## Setup

1. Run `npm install` to install dependencies.
2. Create `.env` in the project root with a `FILE_DESTINATION` key with the full path of the destination local Dropbox folder. This can contain multiple comma-separated paths.

## Develop

Run `gulp` to initialize the task runner, which will watch all project files. 

The following tasks run:

1. **Files**: this task copies all files to the Dropbox folder defined in `.env`
2. **Stylesheets**: this task compiles all SCSS in `/Stylesheets` into `css.css` in the project root
3. **Emails**: This file compiles Nunjuck templates from `/Emails/partials` and `/Emails/layouts` into complete HTML files in `/Emails`. These need to be copied into the Nexudus web interface.

Checkout `gulpfile.js` for what the tasks are actually doing.
