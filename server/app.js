const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const errorMessages = {
    DATABASE_ERROR: 'database error',
    RESOURCE_NOT_FOUND: 'requested resource was not found',
    INVALID_POST_DATA: 'invalid post data'
};

function sendSuccess(res, msg) {
    res.status(200).send(msg);
}
function sendError(res, msg) {
    res.status(500).send(msg);
}

function hasDefinedProperties(obj, properties) {
    for (var p=0; p < properties.length; p++) {
        if (!obj.hasOwnProperty(properties[p]) || obj[properties[p]] === undefined
            || obj[properties[p]] === '' || obj[properties[p]] === null) {
            console.log(properties[p] + ' not found!');
            return false;
        }
    }
    return true;
}

const sortbyDateDescending = (a, b) => {
    if (a.date === b.date) {
        return 0;
    }
    else {
        return a.date < b.date ? 1 : -1;
    }
}

var urlParser = bodyParser.urlencoded({
    extended: false
});
var jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;
var port = 3005;

MongoClient.connect("mongodb://localhost:27017/blog", function(err, database) {
    if(err) throw err;

    db = database.db('blog');
    app.listen(port);
    console.log("Listening on port " + port);
});

app.get('/', (req, res) => res.send("What's up"));

//-------------------- /articles ---------------------------
app.get('/articles', (req, res) => {
    const articlesPerPage = 5;
    const page = (req.query.page && req.query.page >= 1) ? req.query.page : 1;
    const getFull = (req.query.full && req.query.full === 1) ? true : false;

    let articles = [];
    db.collection('articles')
    .find().toArray((error, result) => {
        if (error) {
            sendError(res, errorMessages.DATABASE_ERROR);
        }
        else {
            const firstIndex = (page-1) * articlesPerPage;
            if (firstIndex >= result.length || firstIndex < 0) {
                return res.send([]);
            }
            const lastIndex = Math.min(firstIndex + articlesPerPage, result.length);

            const articles = result
            .map(a => {
                if (getFull) {
                    return {
                        url: a.url,
                        title: a.title,
                        tags: a.tags,
                        intro: a.intro,
                        body: a.body,
                        date: a.date,
                        commentCount: 15
                    }
                }
                else {
                    return {
                        url: a.url,
                        title: a.title,
                        tags: a.tags,
                        intro: a.intro,
                        date: a.date
                    }
                }
            })
            .sort(sortbyDateDescending)
            .slice(firstIndex, lastIndex);

            return res.send({
                content: articles,
                page: page
            });
        }
    });
});
app.get('/articles/:articleUrl', (req, res) => {
    db.collection('articles')
    .findOne({url: req.params.articleUrl}, (error, result) => {
        if (error) {
            sendError(res, errorMessages.DATABASE_ERROR);
        }
        else {
            if (!result) {
                sendError(res, errorMessages.RESOURCE_NOT_FOUND);
            }
            else {
                res.send({...result, comments: "use comments api"});
            }
        }
    });
});
app.get('/articles/:articleUrl/comments', (req, res) => {
    db.collection('articles')
    .findOne({url: req.params.articleUrl}, (error, result) => {
        if (error) {
            sendError(res, errorMessages.DATABASE_ERROR);
        }
        else {
            if (!result) {
                sendError(res, errorMessages.RESOURCE_NOT_FOUND);
            }
            else {
                res.send(result.comments);
            }
        }
    });
});

//----------------------- /reply ----------------------------------------
app.post('/reply', jsonParser, function (req, res) {
    if (!req.body || !hasDefinedProperties(req.body, ['articleUrl', 'userName', 'text', 'threadPath'])) {
        return sendError(res, errorMessages.INVALID_POST_DATA);
    }

    const path = req.body.threadPath.reduce((acc, curr) => acc += `.${curr}.replies`, 'comments');

    let exists = true;
    db.collection('articles')
    .findOne({ url: req.body.articleUrl, [path]: {$exists: true} })
    .then(result => {
        console.log("found article:");
        console.log(path);
        console.log(result);
        if (!result) {
            throw new Error("invalid path or article url");
        }
        else {
            return result;
        }
    })
    .then(result => {
        const newReply = {
            _id: ObjectID(),
            userName: req.body.userName,
            date: Date.now(),
            text: req.body.text,
            replies: []
        };
        return db.collection('articles')
                .update({ url: req.body.articleUrl }, { $push: {[path]: newReply} });
    })
    .then(result => {
        if (result.result.nModified > 0) {
            sendSuccess(res, "added comment");
        }
        else {
            throw new Error("invalid article url");
        }
    })
    .catch(error => {
        console.log("========== error start ==========");
        console.log(Object.keys(error));
        console.log(error);
        console.log("=========== error end ===========");
        sendError(res, error.message);
    });

});