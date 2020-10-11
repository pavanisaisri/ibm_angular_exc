var db = require('./mongoConnection');
const DAL = {};

DAL.saveToMongo = (body) => {
    console.log(body)
    body = body["orderPlaced"]
    return db
        .then(dbInstance => {
            return dbInstance.collection("orders").insertOne({
                "breakfast": body["breakFast"],
                "lunch": body["Lunch"],
                "dinner": body["dinner"],
                dateAdded: new Date()
            })
        })
        .catch(err => {
            throw err;
        })
}

DAL.getAllOrders = () => {
    return db
        .then(async dbInstance => {
            return await dbInstance.collection("orders")
                .find({},{projection: {"_id": 0, dateAdded : 0}})
                .sort({dateAdded : -1})
                .toArray();
        })
        .catch(err => {
            throw err;
        })
}

module.exports = DAL;