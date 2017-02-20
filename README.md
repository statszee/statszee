# StatsZee
## Self-hosted stats server based Node.JS and Sequelize made with [trails.js](http://trailjs.io) framework

### Quick F.A.Q.

#### Another stats server?
I know, Librato and Stathat (and many others services) are good but I think that they lacks of 

#### Why selfhosted?
No need to pay for additional services, extensible, opensource

### Installation

Run inside a node project

    npm install --save statszee

Add into your application entry point

    const statsZee         = require("statszee");
    const statsZeeInstance = new statsZee({
      web:{
        port: process.env.PORT || 4545
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
