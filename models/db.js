const { Pool, Client } = require('pg')
const colors = require('colors')

const client = new Client({
  user: process.env.P_USER,
  host:  process.env.P_HOST,
  database:  process.env.P_DB,
  password:  process.env.P_PW,
  port:  process.env.P_PORT,
});

try{
    client.connect(err=>{
        if(err)
            throw new Error('There was a problem in connecting db');
        else
            console.log('Database successfully started.'.bold.yellow);

    });
}catch(e)
{
    console.log(e.message);
}

module.exports = client;