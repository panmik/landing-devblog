let dao = require('./index');

function getAllInArticle(articleUrl) {
    return dao.db.collection('articles')
    .findOne({
        url: articleUrl
    }, {
        projection: {
            _id: 0,
            comments: 1
        }
    })
    .then(result => {
        if (!result || ! result.comments) {
            throw new Error("invalid article url");
        }
        return result.comments;
    });
};

function getAll() {
    return dao.db.collection('articles')
    .find({}, {
        projection: {
            _id: 0,
            comments: 1
        }
    })
    .toArray()
    .then(result => {
        return Array.prototype.concat(...result.map(obj => obj.comments));
    })
}

function add({articleUrl, path, userName, date, text}) {
    return dao.db.collection('articles')
    .findOne({ url: articleUrl, [path]: {$exists: true} })
    .then(result => {
        if (!result) {
            throw new Error("invalid path or article url");
        }
        else {
            return result;
        }
    })
    .then(result => {
        const newReply = {
            _id: dao.ObjectID(),
            userName,
            date: Date.now(),
            text,
            replies: []
        };
        return dao.db.collection('articles')
                .update({ url: articleUrl }, { $push: {[path]: newReply} });
    })
    .then(result => {
        if (result.result.nModified > 0) {
            return "ok";
        }
        else {
            throw new Error("invalid article url");
        }
    });
}

module.exports = {
    getAllInArticle,
    getAll,
    add
};