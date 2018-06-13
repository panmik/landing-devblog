const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const routes = require('./routes/index');
app.use('/comments', routes.comments);
app.use('/articles', routes.articles);

app.get('/', (req, res) => res.send("What's up"));
//app.use(express.static('public'));

app.listen(port, () => console.log(`listening on port ${port}`));