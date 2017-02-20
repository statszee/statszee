# StatsZee
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
