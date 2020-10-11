var mongoDAL = require('../DB/mongoDAL');

const SERVICES = {};

SERVICES.saveToMongo = (body) => {
    return mongoDAL.saveToMongo(body)
        .then(data => {
            return data;
        })
        .catch(err => {

        })
}

module.exports = SERVICES;