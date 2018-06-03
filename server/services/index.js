const hasDefined = require('../helpers/index').hasDefinedProperties;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const databaseName = 'blog';
const dbPort = 27017;

let dao = {
    db: null,
    msg: "",
    ObjectID
};

MongoClient.connect(`mongodb://localhost:${27017}/${databaseName}`, function(err, database) {
    if(err) {
        throw err;
    }

    dao.db = database.db(databaseName);
    console.log("connected to database");
    dao.msg = "initialized!";
});

module.exports = dao;