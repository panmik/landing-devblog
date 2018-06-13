const articlesService = require('../services/articles'); 
const sortByDateDescending = require('../helpers').sortByDateDescending;

function getAllInPage(query) {
    const page = (query.page && query.page >= 1) ? query.page : 1;
    const getFullContent = (query.full && query.full === '1') ? true : false;
    const articlesPerPage = 5;

    return articlesService.getAll()
        .then(result => {
            const firstIndex = (page - 1) * articlesPerPage;
            if (firstIndex >= result.length || firstIndex < 0) {
                throw new Error("page not available");
            }
            const lastIndex = Math.min(firstIndex + articlesPerPage, result.length);
            const articles = result.map(({
                url,
                title,
                author,
                thumbnail,
                tags,
                intro,
                body,
                date,
                commentCount = 15
            }) => {
                let a = { url, title, author, thumbnail, tags, intro, date, commentCount };
                return getFullContent ? a : { ...a, body };
            })
            .sort(sortByDateDescending)
            .slice(firstIndex, lastIndex);

            return {
                content: articles,
                page: page
            };
        });
}

function getByUrl(params) {
    if (!params.articleUrl) {
        throw new Error("invalid request data");
    }
    return articlesService.getByUrl(params.articleUrl);
}

module.exports = {
    getAllInPage,
    getByUrl
};