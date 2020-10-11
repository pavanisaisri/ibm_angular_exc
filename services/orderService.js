var mongoDAL = require('../DB/mongoDAL');

const SERVICES = {};

SERVICES.saveToMongo = (body) => {
    return mongoDAL.saveToMongo(body)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err;
        })
}

SERVICES.getAllOrders = async () => {
    return await mongoDAL.getAllOrders()
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err;
        })
}

module.exports = SERVICES;