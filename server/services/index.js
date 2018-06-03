const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const databaseName = 'blog';
const dbPort = 27017;

let db = null;
let msg = '';

MongoClient.connect(`mongodb://localhost:${27017}/${databaseName}`, (err, database) => {
    if(err) throw err;

    db = database.db(databaseName);
    console.log("connected to database");
    msg = "initialized!";
});

//workaround for db === null on require time and shortener
const collectionGetter = name => () => db.collection(name);

const getDB = () => db;

module.exports = {
    ObjectID,
    getDB,
    collectionGetter
}