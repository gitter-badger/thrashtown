# Thrashtown

[![Join the chat at https://gitter.im/ramdog/thrashtown](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ramdog/thrashtown?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A simple surf session journal

## Local Development
This is the yeoman generator that was used to scaffold the app:
https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md

Ensure you have these installed on your machine first:
  - mongoDB - database
  - node.js - server
  - yeoman - for various useful generators install with `npm install -g yo`
  - grunt-cli `npm install -g grunt-cli`
  - ruby and ruby-sass (https://github.com/gruntjs/grunt-contrib-sass)

Steps to get the app running locally:

1. Clone the project
2. From terminal, run `mongod` to start mongoDB
3. Run `npm install` and `bower install`
4. Set the `THRASHTOWN_SECRET` environment variable in `server/config/local.env.js`
5. From the project root, run `grunt serve` - this should launch the app in a new Chrome tab

