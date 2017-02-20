<p align="center">
  <img width="300" src="https://rawgithub.com/LobeTia/statszee/master/public/images/logo.svg?raw=true" />
</p>

# StatsZee
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

## Self-hosted stats server based Node.JS and Sequelize made with [trails.js](http://trailjs.io) framework

## WARNING: Not suitable for production
### Work in progress, things are going to change

### Installation

Run inside a node project

    npm install --save statszee

Add into your application entry point

    const statsZee         = require("statszee");
    const statsZeeInstance = new statsZee({
      web:{
        port: process.env.PORT || 3000
      },
      database:{
        stores: {
          database: {
            host: '127.0.0.1',
            port: '5432',
            database: 'stats-server',
          }
        }
      }
    })
    
    statsZeeInstance.start().then(()=>{})

## License
[MIT](https://github.com/lobetia/statszee/blob/master/LICENSE)

[snyk-image]: https://snyk.io/test/github/lobetia/statszee/badge.svg
[snyk-url]: https://snyk.io/test/github/lobetia/statszee/
[ci-image]: https://travis-ci.org/LobeTia/statszee.svg?branch=master
[ci-url]: https://travis-ci.org/LobeTia/statszee
[daviddm-image]: http://img.shields.io/david/lobetia/statszee.svg?style=flat-square
[daviddm-url]: https://david-dm.org/lobetia/statszee
[codeclimate-image]: https://img.shields.io/codeclimate/github/LobeTia/statszee.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/LobeTia/statszee
