const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const databaseName = 'blog';
const url = process.env.MONGODB_URI || `mongodb://localhost:${27017}/${databaseName}`;

let db = null;
let msg = '';

MongoClient.connect(url, (err, database) => {
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