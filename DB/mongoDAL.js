
const DAL = {};

DAL.saveToMongo = (body) => {
    return mongoDAL.saveToMongo(body)
        .then(data => {
            return data;
        })
        .catch(err => {

        })
}

module.exports = DAL;