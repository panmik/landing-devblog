const articlesService = require('../services/articles'); 

function getAllInPage(query) {
    const page = (query.page && query.page >= 1) ? query.page : 1;
    const getFullContent = (query.full && query.full === '1') ? true : false;
    const articlesPerPage = 5;

    return articlesService.getAllInPage(page, getFullContent, articlesPerPage);
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