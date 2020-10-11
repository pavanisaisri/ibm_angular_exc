var mongodb = require('mongodb');
var config = require('../public/config');

var mongoConnectionString = config.dbConnectionString;
var dbName = config.dbName;
var dbConn = mongodb.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connection => {
        console.log("Succesfully Connected to Mongodb");
        return Promise.resolve(connection.db(dbName));
    })
    .catch(error => {
        console.log("Error Connecting Mongodb now exiting");
        console.log(error);
        process.exit(1);
    })

module.exports = dbConn;
