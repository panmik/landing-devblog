const commentsService = require('../services/comments'); 
const helpers = require('../helpers/index');

function getAllInArticle(params) {
    if (!params || !params.articleUrl) {
        throw new Error("invalid article url");
    }
    return commentsService.getAllInArticle(params.articleUrl);
}

function getAll() {
    return commentsService.getAll();
}

function add(reply) {
    if (!reply || !helpers.hasDefinedProperties(reply, ['articleUrl', 'userName', 'text', 'threadPath'])) {
        throw new Error("invalid reply data");
    }

    const path = reply.threadPath.reduce((acc, curr) => acc += `.${curr}.replies`, 'comments');
    return commentsService.add({...reply, path});
}

module.exports = {
    getAllInArticle,
    getAll,
    add
};