const express = require('express');
const app = express();
const port = 3005;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// const comments = require('./routes/comments');
// const articles = require('./routes/articles');

// app.use('/comments', comments);
// app.use('/articles', articles);

app.get('/', (req, res) => res.send("What's up"));

app.listen(port);