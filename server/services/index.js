const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const uri = process.env.MONGODB_URI || `mongodb://localhost:${27017}/${databaseName}`;

let db = null;
let msg = '';
let res = /mongodb:\/\/(.+?):(.+?)@(.+?):([0-9]+)\/(.+?$)/g.exec(uri);
const connParams = {
    username: res[1],
    password: res[2],
    domain: res[3],
    port: res[4],
    dbname: res[5]
};

console.log(connParams);
MongoClient.connect(uri, { useNewUrlParser: true }, (err, database) => {
    if(err) throw err;

    db = database.db(connParams.dbname);
    console.log("connected to database");
    msg = "initialized!";
});

//workaround for db === null on require time and shortener
const collectionGetter = collName => () => db.collection(collName);

const getDB = () => db;

module.exports = {
    ObjectID,
    getDB,
    collectionGetter
}