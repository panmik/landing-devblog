
let dao = require('./index');
let sortbyDateDescending = require('../helpers').sortByDataDescending;

function getByUrl(url) {
    return dao.db.collection('articles')
    .findOne({
        url: url
    }, {
        projection: {
            comments: 0
        }
    })
    .then(result => {
        if (!result) {
            throw new Error("invalid article url");
        }
        return result;
    });
};

function getAllInPage(page, getFullContent, articlesPerPage) {
    return dao.db.collection('articles')
    .find({}, {
        projection: {
            comments: 0
        }
    })
    .toArray()
    .then(result => {
        const firstIndex = (page-1) * articlesPerPage;
        if (firstIndex >= result.length || firstIndex < 0) {
            return res.send([]);
        }
        const lastIndex = Math.min(firstIndex + articlesPerPage, result.length);
        const articles = result.map(a => {
            if (getFullContent) {
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

        return {
            content: articles,
            page: page
        };
    })
}

module.exports = {
    getAllInPage,
    getByUrl
}