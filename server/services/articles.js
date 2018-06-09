
const getArticles = require('./index').collectionGetter('articles');

function getByUrl(url) {
    return getArticles()
        .findOne({ url: url }, { projection: { comments: 0 } })
        .then(result => {
            if (!result) {
                throw new Error("invalid article url");
            }
            return result;
        });
}

function getAll() {
    return getArticles()
        .find({}, { projection: { comments: 0 } })
        .toArray();
}

module.exports = {
    getAll,
    getByUrl
}