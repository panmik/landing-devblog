const ObjectID = require('./index').ObjectID;
const getArticles = require('./index').collectionGetter('articles');

function getAllInArticle(articleUrl) {
    return getArticles().findOne({ url: articleUrl }, { projection: { _id: 0, comments: 1 } })
        .then(result => {
            if (!result || !result.comments) {
                throw new Error("invalid article url");
            }
            return result.comments;
        });
};

function getAll(flat = true) {
    return getArticles().find({}, { projection: { _id: 0, comments: 1 } })
        .toArray()
        .then(result => {
            const comments = result.map(obj => obj.comments);
            return flat ? Array.prototype.concat(...comments) : comments;
        })
}

function add({ articleUrl, path, userName, date, text }) {
    return getArticles()
        //ensure parent article exists
        .findOne({ url: articleUrl, [path]: { $exists: true } })
        .then(result => {
            if (!result) {
                throw new Error("invalid path or article url");
            } else {
                return {
                    _id: ObjectID(),
                    userName,
                    date: Date.now(),
                    text,
                    replies: []
                };
            }
        })
        //push new comment
        .then(comment => {
            return getArticles().update({ url: articleUrl }, { $push: { [path]: comment } });
        })
        .then(operation => {
            if (operation.result.nModified > 0) {
                return "comment added";
            } else {
                throw new Error("invalid article url");
            }
        });
}

module.exports = {
    getAllInArticle,
    getAll,
    add
};