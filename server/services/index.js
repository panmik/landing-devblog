const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let db = null;
let msg = '';
let connParams = {};
let uri = '';
if (process.env.MONGODB_URI) {
    uri = process.env.MONGODB_URI;
    let res = /mongodb:\/\/(.+?):(.+?)@(.+?):([0-9]+)\/(.+?$)/g.exec(uri);
    connParams = {
        username: res[1],
        password: res[2],
        domain: res[3],
        port: res[4],
        dbname: res[5]
    };
} else {
    connParams = {
        port: 27017,
        dbname: 'blog'
    };
    uri = `mongodb://localhost:${connParams.port}/${connParams.dbname}`;
}

MongoClient.connect(uri, { useNewUrlParser: true }, (err, database) => {
    if(err) throw err;

    db = database.db(connParams.dbname);
    console.log(`connected to database ${connParams.dbname}`);
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