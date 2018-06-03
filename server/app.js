const express = require('express');
const app = express();
const port = 3005;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const comments = require('./routes/comments');
const articles = require('./routes/articles');

app.use('/comments', comments);
app.use('/articles', articles);

app.get('/', (req, res) => res.send("What's up"));

app.listen(port);

//-------------------- /articles ---------------------------
/*app.get('/articles', (req, res) => {
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

//----------------------- /reply ----------------------------------------
app.post('/reply', jsonParser, function (req, res) {
    if (!req.body || !hasDefinedProperties(req.body, ['articleUrl', 'userName', 'text', 'threadPath'])) {
        return sendError(res, errorMessages.INVALID_POST_DATA);
    }

    const path = req.body.threadPath.reduce((acc, curr) => acc += `.${curr}.replies`, 'comments');
    //comments.$0.replies.$2.replies

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

});*/